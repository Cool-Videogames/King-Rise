import * as config from "./config.js"
import Vector2D from "./vector2D.js"
import * as functions from "./functions.js";

export default class Obstaculo extends Phaser.GameObjects.Sprite {
    constructor(scene, coste, posicion) {
        let offSetX = config.sizeCasilla / 2;
        let offSetY = config.sizeCasilla;

        super(scene, posicion.x + offSetX, posicion.y + config.sizeCasilla, 'obstaculo');
        this.game = scene;
        this.coste = coste;
        this.posicion = posicion;
        this.destruible = true;

        this.setMenu();
        this.setInteractive();
        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.personasDepth - 1);
        scene.add.existing(this);
        this.abreMarco = this.muestraOpciones();
    }

    setMenu() {
        this.initMarco();
        this.creaText();
        this.asignaInput();
        this.clickEnObstaculo(this);
    }

    initMarco() {
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 0.75, this.posicion.y - config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'eliminar', this.game, config.hudDepth);
        this.marco.setVisible(false);

        this.equis = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height / 2, 'x', this.game, config.hudDepth);
        this.equis.setOrigin(0.5, 0.5); this.equis.setScale(1.5, 1.5); this.equis.setVisible(false);

        this.moneda = functions.creaSprite(this.marco.x + this.marco.width * 0.84, this.marco.y + this.marco.height * 0.85, 'moneda', this.game, config.hudDepth);
        this.moneda.setScale(0.25, 0.25); this.moneda.setOrigin(0.5, 0.5); this.moneda.setVisible(false);
    }


    creaText() {
        this.text = functions.creaTexto(this.marco.x + this.marco.width * 0.66, this.marco.y + this.marco.height * 0.86, this.coste, this.game);
        let i = this.text;
        i.setDepth(config.hudDepth); i.setVisible(false);
        i.setFontSize(17);
        i.setStroke(config.stroke, 3);
        i.setFill('#DF9013');
    }

    asignaInput() {
        this.equis.on('pointerup', pointer => {
            if (this.game.recursos.oro >= this.coste) {
                this.game.recursos.oro -= this.coste;
                this.game.interfaz.actualizaInterfaz();
                this.eliminar();
            }
        })
    }

    clickEnObstaculo(obstaculoSprite) {
        obstaculoSprite.on('pointerup', pointer => {
            if (!this.game.jug.isBuilding) {
                if (!this.marco.visible) {
                    this.game.cierraMarcoAnterior();
                    this.game.cierraMarcoAnterior = this.abreMarco;
                }
                else this.game.cierraMarcoAnterior = () => { };
                this.abreMarco();
            }
        })
    }

    muestraOpciones() {
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.equis.setVisible(!this.equis.visible);
            this.moneda.setVisible(!this.moneda.visible);
            this.text.setVisible(!this.text.visible);
        }
    }

    eliminar() {
        this.game.audio.destruccion.play();
        this.posicion.sprite.clearTint();
        this.posicion.tint = this.posicion.sprite.tint;
        this.posicion.ocupada = false;
        this.marco.destroy();
        this.equis.destroy();
        this.moneda.destroy();
        this.text.destroy();
        this.destroy();
    }
}