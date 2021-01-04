import EdificioDefensivo from "./edificioDefensivo.js";
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";
import * as config from "./config.js"

export default class CaballoTroya extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);

        this.game = scene;
        this.hasMenu = true;

        this.variacionAldeanos = 0;
        this.texts = new Array(4);
        this.abreMarco = this.muestraOpciones();

        this.setScale(3, 3);

        this.setMenu();
    }

    setMenu() {
        this.initMarco();
        this.createMasMenos();
        this.creaText();
        this.asignaInput();
        this.clickEnCaballo(this);
    }

    initMarco() {
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 1.5, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'asignar', this.game, config.hudDepth);
        this.marco.setVisible(false);

        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);
    }

    createMasMenos() {
        this.mas = functions.creaSprite(0, 0, 'mas', this.game, config.hudDepth);
        this.mas.setVisible(false); this.mas.setScale(5, 5); this.mas.setOrigin(0.5, 0.5);
        this.menos = functions.creaSprite(0, 0, 'menos', this.game, config.hudDepth);
        this.menos.setVisible(false); this.menos.setScale(7, 7); this.menos.setOrigin(0.5, 0.5);

        let offSet = 0.15;
        this.mas.setPosition(this.marco.x + this.marco.width * (1 - offSet), this.marco.y + this.marco.height / 2 * (1 + offSet));
        this.menos.setPosition(this.marco.x + this.marco.width * offSet, this.marco.y + this.marco.height / 2 * (1 + offSet));
    }

    creaText() {
        this.texts[0] = functions.creaTexto(this.marco.x + this.marco.width * 0.5, this.marco.y + this.marco.height * 0.29, this.aldeanosMax, this.game);
        this.texts[1] = functions.creaTexto(this.marco.x + this.marco.width * 0.58, this.marco.y + this.marco.height * 0.57, this.numAldeanos, this.game);
        this.texts[2] = functions.creaTexto(this.marco.x + this.marco.width * 0.86, this.marco.y + this.marco.height * 0.84, this.game.exploradores.length, this.game);
        this.texts[3] = functions.creaTexto(this.x - 2, this.y - this.height * 0.8, this.numAldeanos, this.game);
        for (let i of this.texts) {
            i.setDepth(config.hudDepth); i.setVisible(false);
            i.setFontSize(19);
            i.setStroke(config.stroke, 3);
        }
        this.texts[1].setFontSize(45);
        this.texts[3].setVisible(true);
    }

    asignaInput() {
        this.mas.on('pointerup', pointer => {
            if (this.numAldeanos < this.aldeanosMax && this.numAldeanos + 1 <= this.game.exploradores.length) {
                this.numAldeanos++;
                this.variacionAldeanos++;
                this.texts[1].text = this.numAldeanos;
                this.texts[3].text = this.numAldeanos;
            }
        })

        this.menos.on('pointerup', pointer => {
            if (this.numAldeanos > 0) {
                this.numAldeanos--;
                this.variacionAldeanos--;
                this.texts[1].text = this.numAldeanos;
                this.texts[3].text = this.numAldeanos;
            }
        })

        this.done.on('pointerup', pointer => {
            if (this.variacionAldeanos < 0) {
                for (let i = 0; i < -this.variacionAldeanos; ++i)this.game.exploradores.push(this.game.creaAldeano());
            }
            else if (this.variacionAldeanos > 0) {
                for (let i = 0; i < this.variacionAldeanos; ++i)this.game.exploradores.pop().destroy();
            }
            this.variacionAldeanos = 0;
            this.game.cierraMarcoAnterior = () => { };
            this.abreMarco();
            this.game.interfaz.actualizaInterfaz();
        })
    }

    clickEnCaballo(caballoSprite) {
        caballoSprite.on('pointerup', pointer => {
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

    muestraOpcionesTorre() {
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.done.setVisible(!this.done.visible);
            this.texts[2].text = this.game.exploradores.length;
            this.mas.setVisible(!this.mas.visible);
            this.menos.setVisible(!this.menos.visible);
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);

            for (let i of this.texts) {
                i.setVisible(!i.visible);
            }
            this.texts[3].setVisible(true);
        }
    }

    //Cuando lo destruimos nosotros
    destruir() {
        super.destruir();
        this.rangoSprite.destroy();
        this.marco.destroy();
        this.mas.destroy();
        this.menos.destroy();
        this.done.destroy();
        for (let i of this.texts) i.destroy();
    }
}
