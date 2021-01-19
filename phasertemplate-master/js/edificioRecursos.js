import Edificio from "./edificio.js";
import * as config from "./config.js"

export default class EdificioRecursos extends Edificio {
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key) {
        super(scene, vida, coste, posicion, ancho, alto, key);

        this.ancho = ancho; this.alto = alto;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.rendimientoAldeanos = 0;
        this.cantidad = config.cantidadRecursosPorDefecto * this.numAldeanos;
        this.posMarcoX = 4;
        this.game = scene;

        this.recursos = true;
        this.generaRecursos = 0;

        this.variacionAldeanos = 0;
        this.isBuilt = false;
        this.timer = 5000;
    }

    muestraOpciones() {
        return () => {
            if (this.aldeanosAsignables) {
                this.marco.setVisible(!this.marco.visible);
                this.done.setVisible(!this.done.visible);
                this.texts[2].text = this.tipoAldeano.length;
                this.mas.setVisible(!this.mas.visible);
                this.menos.setVisible(!this.menos.visible);
                for (let i of this.texts) {
                    i.setVisible(!i.visible);
                }
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
    generar() {
        this.cantidad = config.cantidadRecursosPorDefecto * this.numAldeanos;
        this.game.interfaz.actualizaInterfaz();
    }
}
