import EdificioDefensivo from "./edificioDefensivo.js";
import * as config from "./config.js"
import * as functions from "./functions.js";
import Vector2D from "./vector2D.js";

export default class CaballoTroya extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.tipoAldeano = scene.exploradores;
        this.game = scene;
        this.setScale(2.2, 2.2);
    }
    initMarco() {
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 3, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'asignar', this.game, config.hudDepth);
        this.marco.setVisible(false);

        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);
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
    //Cuando lo destruye el enemigo. Spawnear aldeanos almacenados
    enemyDestruir() {
        for (let i = 0; i < this.numAldeanos; ++i) {
            let sexo = Math.round(Math.random(0, 1));
            if (sexo === 0) sexo = 'aldeano';
            else sexo = 'aldeana';

            let rndX = Math.floor(Math.random() * this.ancho);
            let rndY = Math.floor(Math.random() * this.alto);
            let nextCell = this.game.mapa.mapa[this.posicion.indiceX + rndX][this.posicion.indiceY + rndY];

            let aldeano = new Aldeano(this.game, nextCell, 0, 0, sexo);
            this.game.exploradores.push(aldeano);
        }
        this.destruir();
    }
}
