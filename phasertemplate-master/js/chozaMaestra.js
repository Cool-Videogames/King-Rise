import Edificio from "./edificio.js";
import * as config from "./config.js"
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";
import Minero from "./minero.js";
import Cantero from "./cantero.js";
import Ganadero from "./ganadero.js";
import Explorador from "./explorador.js";

export default class ChozaMaestra extends Edificio {
    constructor(scene, vida, coste, posicion, ancho, alto, key) {
        super(scene, vida, coste, posicion, alto, ancho, key);

        this.ancho = ancho; this.alto = alto;
        this.opEnum = { mineros: 0, canteros: 1, ganaderos: 2, exploradores: 3 };
        this.names = new Array(2); this.names[0] = 'mas'; this.names[1] = 'menos';
        this.pos = new Array(config.numEspecialidades * 2);
        this.ops = new Array(config.numEspecialidades * 2);
        this.texts = new Array(config.numEspecialidades);
        this.aldeanosAsignables = false;

        this.nMin = 0; this.nGan = 0; this.nCant = 0; this.nExp = 0; this.costeTotal = 0; this.numTotal = 0;
        this.costeMin = 20; this.costeGan = 20; this.costeCant = 20; this.costeExp = 20;
        this.hasMenu = true;
    }

    setMenu() {
        this.creaBarraVida();
        this.initMarco(); this.createMasMenos();
        this.creaText(); this.setMasMenosPos();
        this.clickEnDone(this.done);
        this.clickEnMasCrear(this.masCrear);
    }
    initMarco() {
        //MARCO DEL MENU
        this.posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 2.5, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(this.posicionMarco.x, this.posicionMarco.y, 'marco', this.game, config.hudDepth);
        this.marco.setVisible(false);

        this.marcoCrear = functions.creaSprite(this.posicionMarco.x, this.posicionMarco.y - this.marco.height, 'marcoCrear', this.game, config.hudDepth);
        this.marcoCrear.setVisible(false);

        this.masCrear = functions.creaSprite(this.marcoCrear.x + this.marcoCrear.width * 0.45, this.marcoCrear.y + 32, 'masCrear', this.game, config.hudDepth);
        this.masCrear.setVisible(false);

        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);

        this.coste = functions.creaTexto(this.marco.x + this.marco.width / 2 + 60, this.marco.y + this.marco.height - 18, this.costeTotal, this.game);
        this.coste.setScale(0.6, 0.6); this.coste.setVisible(false); this.coste.setFill('#DF9013');
    }
    createMasMenos() {
        let j = 0;
        for (let i = 0; i < this.ops.length; i++) {
            this.ops[i] = functions.creaSprite(0, 0, this.names[j], this.game, config.hudDepth);
            this.ops[i].setVisible(false); this.ops[i].setScale(2, 2);
            if (j === 0) j = 1;
            else if (j === 1) j = 0;
        }
        this.asignaInput();
    }
    setMasMenosPos() {
        let offSet = 27;
        for (let i = 0; i < this.ops.length; i += 2) {
            this.ops[i].setPosition(this.marco.x + this.marco.width - offSet, this.marco.y + offSet + i * 9);
            this.ops[i + 1].setPosition(this.marco.x + this.marco.width - offSet * 2 - 9, this.marco.y + offSet + i * 9);
        }
    }
    muestraOpciones() {
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.marcoCrear.setVisible(!this.marcoCrear.visible);
            this.masCrear.setVisible(!this.masCrear.visible);
            this.done.setVisible(!this.done.visible);
            this.coste.setVisible(!this.coste.visible);
            this.costeTotal = 0;
            this.coste.text = this.costeTotal;
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);

            for (let i of this.ops) i.setVisible(!i.visible);
            this.nMin = 0; this.nCant = 0; this.nGan = 0; this.nExp = 0;
            for (let i of this.texts) {
                i.text = 0;
                i.setVisible(!i.visible);
            }
        }
    }
    creaText() {
        let xpos = this.marco.x + this.marco.width - 38; let ypos = this.marco.y + 36;
        let op = this.opEnum;
        this.texts[op.mineros] = functions.creaTexto(xpos, ypos, this.nMin, this.game);
        this.texts[op.canteros] = functions.creaTexto(xpos, ypos + 18, this.nCant, this.game);
        this.texts[op.ganaderos] = functions.creaTexto(xpos, ypos + 35, this.nGan, this.game);
        this.texts[op.exploradores] = functions.creaTexto(xpos, ypos + 53, this.nExp, this.game);
        for (let i of this.texts) {
            i.setDepth(config.hudDepth); i.setVisible(false);
            i.setFontSize(19); i.setStroke(config.stroke, 3);
        }
    }
    actualizaCosteTotal() {
        this.costeTotal = this.nMin * this.costeMin + this.nCant * this.costeCant + this.nGan * this.costeGan + this.nExp * this.costeGan;
        this.coste.text = this.costeTotal;
        this.numTotal = this.nMin + this.nCant + this.nGan + this.nExp;
    }
    asignaInput() {
        this.inputMineros(this.ops[0], this.ops[1]); this.inputCanteros(this.ops[2], this.ops[3]);
        this.inputGanaderos(this.ops[4], this.ops[5]); this.inputExploradores(this.ops[6], this.ops[7]);
    }
    destruir() {
        this.coste.destroy();
        this.marco.destroy();
        this.marcoCrear.destroy();
        this.masCrear.destroy();
        this.done.destroy();
        for (let i of this.texts) i.destroy();
        for (let i of this.ops) i.destroy();
        this.game.cierraMarcoAnterior = () => { };

        this.game.numChozas--;
        this.game.interfaz.sprites[this.game.interfaz.names.chozaMaestra].clearTint();
        this.game.interfaz.actualizaInterfaz();
        super.destruir();
    }
    clickEnDone(done) {
        done.on('pointerup', pointer => {
            if (this.costeTotal <= this.game.recursos.oro) {
                this.game.recursos.oro -= this.costeTotal;
                this.game.interfaz.actualizaInterfaz();
                this.especializa(0, this.nMin, this.nCant, this.nGan, this.nExp);
                this.game.interfaz.actualizaInterfaz();
                this.abreMarcos();
                this.game.cierraMarcoAnterior = () => { };
                this.marcoDestruir.setVisible(false);
                this.numTotal = 0;
            }
        })
    }

    clickEnMasCrear(masCrear) {
        masCrear.on('pointerup', pointer => {
            if (this.game.recursos.comida - 20 >= 0) {
                this.game.creaAldeanos(1, this.game.aldeanosBasicos);
                this.game.recursos.comida -= 20;
                this.game.interfaz.actualizaInterfaz();
            }
        })
    }

    inputMineros(masmineros, menosmineros) {
        masmineros.on('pointerdown', pointer => {
            if (this.game.aldeanosBasicos.length > this.numTotal) {
                this.nMin++;
                this.texts[this.opEnum.mineros].text = this.nMin;
                this.actualizaCosteTotal();
            }
            else console.log("No quedan aldeanos basicos para especializar")
        });
        menosmineros.on('pointerdown', pointer => {
            if (this.nMin > 0) this.nMin--;
            this.texts[this.opEnum.mineros].text = this.nMin;
            this.actualizaCosteTotal();
        });
    }
    inputCanteros(mascanteros, menoscanteros) {
        mascanteros.on('pointerdown', pointer => {
            if (this.game.aldeanosBasicos.length > this.numTotal) {
                this.nCant++;
                this.texts[this.opEnum.canteros].text = this.nCant;
                this.actualizaCosteTotal();
            }
            else console.log("No quedan aldeanos basicos para especializar")
        });
        menoscanteros.on('pointerdown', pointer => {
            if (this.nCant > 0) this.nCant--;
            this.texts[this.opEnum.canteros].text = this.nCant;
            this.actualizaCosteTotal();
        });
    }
    inputGanaderos(masganaderos, menosganaderos) {
        masganaderos.on('pointerdown', pointer => {
            if (this.game.aldeanosBasicos.length > this.numTotal) {
                this.nGan++;
                this.texts[this.opEnum.ganaderos].text = this.nGan;
                this.actualizaCosteTotal();
            }
            else console.log("No quedan aldeanos basicos para especializar")
        });
        menosganaderos.on('pointerdown', pointer => {
            if (this.nGan > 0) this.nGan--;
            this.texts[this.opEnum.ganaderos].text = this.nGan;
            this.actualizaCosteTotal();
        });
    }
    inputExploradores(masexploradores, menosexploradores) {
        masexploradores.on('pointerdown', pointer => {
            if (this.game.aldeanosBasicos.length > this.numTotal) {
                this.nExp++;
                this.texts[this.opEnum.exploradores].text = this.nExp;
                this.actualizaCosteTotal();
            }
            else console.log("No quedan aldeanos basicos para especializar")
        })
        menosexploradores.on('pointerdown', pointer => {
            if (this.nExp > 0) this.nExp--;
            this.texts[this.opEnum.exploradores].text = this.nExp;
            this.actualizaCosteTotal();
        })
    }

    especializa(aldeanos, mineros, canteros, ganaderos, exploradores) {
        for (let i = 0; i < aldeanos; i++) this.game.aldeanosBasicos.push(this.game.creaAldeano());

        for (let i = 0; i < mineros; i++) {
            let aldeano = this.borraAldeano();
            let minero = new Minero(this.game, aldeano.casilla, 0, 0);
            this.game.mineros.push(minero);
        }
        for (let i = 0; i < canteros; i++) {
            let aldeano = this.borraAldeano();
            let cantero = new Cantero(this.game, aldeano.casilla, 0, 0);
            this.game.canteros.push(cantero);
        }
        for (let i = 0; i < ganaderos; i++) {
            let aldeano = this.borraAldeano();
            let ganadero = new Ganadero(this.game, aldeano.casilla, 0, 0);
            this.game.ganaderos.push(ganadero);
        }
        for (let i = 0; i < exploradores; i++) {
            let aldeano = this.borraAldeano();
            let explorador = new Explorador(this.game, aldeano.casilla, 0, 0);
            this.game.exploradores.push(explorador);
        }
    }
    borraAldeano() {
        let aldeano = this.game.aldeanosBasicos[this.game.aldeanosBasicos.length - 1];
        this.game.aldeanosBasicos[this.game.aldeanosBasicos.length - 1].destroy();
        this.game.aldeanosBasicos.pop();
        return aldeano;
    }
}
