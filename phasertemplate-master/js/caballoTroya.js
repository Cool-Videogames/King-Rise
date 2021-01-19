import EdificioDefensivo from "./edificioDefensivo.js";

export default class CaballoTroya extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.tipoAldeano = scene.exploradores;
        this.game = scene;
        this.posMarcoX = 3;
        this.setScale(2.2, 2.2);
    }
    muestraOpciones(){ //CAMBIAR PARA ADAPTARLO AL MENU DEL CABALLO DE TROYA (SI LO TIENE)
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.done.setVisible(!this.done.visible);
            this.mas.setVisible(!this.mas.visible);
            this.menos.setVisible(!this.menos.visible);
            this.texts[2].text = this.tipoAldeano.length;
            for (let i of this.texts) {
                i.setVisible(!i.visible);
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
}
