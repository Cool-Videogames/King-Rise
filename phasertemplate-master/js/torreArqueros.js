import EdificioDefensivo from "./edificioDefensivo.js";
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";
import * as config from "./config.js"

export default class TorreArqueros extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.body.setSize(this.body.width * rango, this.body.height * rango);
        this.arrow = null;
        this.enemy = null;
        this.fireRate = 0; //Tiempo en ms

        scene.physics.add.overlap(this, this.game.jug, (turret, enemy) => {
            if (this.arrow === null && this.fireRate <= 0) {
                this.fireRate = 2000;
                this.enemy = enemy;
                this.arrow = scene.physics.add.sprite(this.x, this.y - this.height / 2, 'arrow');
                this.arrow.body.setSize(this.arrow.width / 1.5, this.arrow.height / 2.5);

                scene.physics.add.overlap(this.arrow, this.game.jug, (arrow, enemy) => {
                    arrow.destroy();
                    this.arrow = null;
                    this.atacar(enemy, 10 * this.numAldeanos);
                })
            }
        });

        this.variacionAldeanos = 0;
        this.texts = new Array(3);
        this.abreMarco = this.muestraOpciones();
    }

    preUpdate(t, dt) {

        this.fireRate -= dt;
        if (this.arrow !== null) {
            let angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.arrow.x, this.arrow.y);
            this.arrow.setRotation(angle);
            this.game.physics.moveTo(this.arrow, this.enemy.x, this.enemy.y, 200);
        }
        super.preUpdate(t, dt);
    }

    setMenu() {
        this.initMarco();
        this.createMasMenos();
        this.creaText();
        this.asignaInput();
        this.clickEnTorre(this);
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
        for (let i of this.texts) {
            i.setDepth(config.hudDepth); i.setVisible(false);
            i.setFontSize(19);
            i.setStroke(config.stroke, 3);
        }
        this.texts[1].setFontSize(45);
    }

    asignaInput() {
        this.mas.on('pointerdown', pointer => {
            if (this.numAldeanos < this.aldeanosMax && this.numAldeanos + 1 <= this.game.exploradores.length) {
                this.numAldeanos++;
                this.variacionAldeanos++;
                this.texts[1].text = this.numAldeanos;
            }
        })

        this.menos.on('pointerdown', pointer => {
            if (this.numAldeanos > 0) {
                this.numAldeanos--;
                this.variacionAldeanos--;
                this.texts[1].text = this.numAldeanos;
            }
        })

        this.done.on('pointerdown', pointer => {
            if (this.variacionAldeanos < 0) {
                for (let i = 0; i < -this.variacionAldeanos; ++i)this.game.exploradores.push(this.game.creaAldeano());
            }
            else if (this.variacionAldeanos > 0) {
                for (let i = 0; i < this.variacionAldeanos; ++i)this.game.exploradores.pop().destroy();
            }
            this.variacionAldeanos = 0;
            this.abreMarco();
        })
    }

    clickEnTorre(torreSprite) {
        torreSprite.on('pointerup', pointer => {
            if (!this.game.jug.isBuilding) {
                this.game.cierraMarcoAnterior();
                this.game.cierraMarcoAnterior = this.abreMarco;
                this.abreMarco();
            }
        })
    }

    muestraOpciones() {
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.done.setVisible(!this.done.visible);
            this.texts[2].text = this.game.exploradores.length;
            this.mas.setVisible(!this.mas.visible);
            this.menos.setVisible(!this.menos.visible);

            for (let i of this.texts) {
                i.setVisible(!i.visible);
            }
        }
    }

    onDestroy() {
        //Spawnear aldeanos almacenados
    }

    recuperaAldeanos() {
        //CUANDO TERMINE EL ATAQUE SE LLAMARÁ A ESTE MÉTODO
        for (let i = 0; i < this.numAldeanos; i++)this.game.exploradores.push(this.game.creaAldeano());
        this.numAldeanos = 0;
    }
}