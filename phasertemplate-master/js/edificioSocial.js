import Edificio from "./edificio.js";
import * as config from "./config.js"
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";

export default class EdificioSocial extends Edificio{
    constructor(scene, vida, coste, posicion, ancho, alto, felicidad, aldeanosMax, key){
        super(scene, vida, coste, posicion ,ancho, alto, key);
        this.tipoAldeano = scene.aldeanosBasicos;
        this.variacionAldeanos = 0;
        this.cantidad= felicidad;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.timer = 5000;
    }
    initMarco(){
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 4, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'asignar', this.game, config.hudDepth);
        this.marco.setVisible(false);
        this.text = functions.creaTexto(this.x + 97, this.y - this.height * 1.12, this.numAldeanos, this.game);
        this.text.setFontSize(config.fontSize-5);
        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);
    }
    muestraOpciones() {
        return () => {
            if(this.aldeanosAsignables){
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
    asignarAldeanos(aldeanos){
        this.numAldeanos+= aldeanos;
    }
}
