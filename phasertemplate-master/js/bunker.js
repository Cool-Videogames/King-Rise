import EdificioDefensivo from "./edificioDefensivo.js";
import * as config from "./config.js"
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";

export default class Bunker extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.tipoAldeano = scene.aldeanosBasicos;
    }

    muestraOpciones() { //CAMBIAR PARA ADAPTARLO AL MENU DEL CABALLO DE TROYA (SI LO TIENE)
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
    initMarco() {
        this.posMarcoX = 3.65;
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * this.posMarcoX, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'asignar', this.game, config.hudDepth);
        this.marco.setVisible(false);
        this.text = functions.creaTexto(this.x + 2, this.y - this.width * 0.65, this.numAldeanos, this.game);
        this.text.setFontSize(config.fontSize - 5);
        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);
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
                this.texts[1].text = this.numAldeanos;
                this.text.text = this.numAldeanos;
                this.variacionAldeanos = 0;
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }

    asignaInput() {
        this.mas.on('pointerup', pointer => {
            if (this.variacionAldeanos + this.numAldeanos < this.aldeanosMax && this.variacionAldeanos + 1 <= this.tipoAldeano.length) {
                this.variacionAldeanos++;
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text--;
                this.text.text = this.variacionAldeanos + this.numAldeanos;
            }
        })

        this.menos.on('pointerup', pointer => {
            if (this.variacionAldeanos + this.numAldeanos > 0) {
                this.variacionAldeanos--;
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text++;
                this.text.text = this.variacionAldeanos + this.numAldeanos;
            }
        })

        this.done.on('pointerup', pointer => {
            if (this.variacionAldeanos < 0) {
                for (let i = 0; i < -this.variacionAldeanos; ++i) {
                    this.tipoAldeano.push(this.game.creaAldeano());
                    this.numAldeanos--;
                }
            }
            else if (this.variacionAldeanos > 0) {
                for (let i = 0; i < this.variacionAldeanos; ++i) {
                    let aldeano = this.tipoAldeano[0];
                    aldeano.morir();
                    this.numAldeanos++;
                }
            }
            this.variacionAldeanos = 0;
            this.game.cierraMarcoAnterior = () => { };
            this.abreMarcos();
            this.game.interfaz.actualizaInterfaz();
        })
    }

    destruir() {
        super.destruir();
        this.text.destroy();
    }
}