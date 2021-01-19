import EdificioDefensivo from "./edificioDefensivo.js";
import * as config from "./config.js"
import * as functions from "./functions.js";

export default class TorreArqueros extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.body.setSize(config.sizeCasilla * rango, config.sizeCasilla * rango);

        this.arrow = null;
        this.enemy = null;
        this.fireRate = 0; //Tiempo en ms
        this.game = scene;
        this.aldeanosAsignables = true;
        this.rango = rango;
        this.collider = null;
        this.numAldeanos = 0;

        this.rangoSprite = null;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.game.acciones.ataqueEnCurso && this.collider === null) {
            this.collider = this.game.physics.add.overlap(this, this.game.oleadasEnemigos.currentWave, (turret, enemy) => {
                if (this.arrow === null && this.fireRate <= 0 && this.numAldeanos > 0) {
                    this.fireRate = 2000;
                    this.enemy = enemy;
                    this.arrow = this.game.physics.add.sprite(this.x, this.y - this.height / 2, 'arrow');
                    this.arrow.setDepth(config.hudDepth - 1);
                    this.arrow.body.setSize(this.arrow.width / 1.5, this.arrow.height / 2.5);

                    this.game.physics.add.overlap(this.arrow, enemy, (arrow, enemy) => {
                        arrow.destroy();
                        this.arrow = null;
                        this.atacar(enemy, config.danioTorreArqueros * this.numAldeanos);
                    })
                }
            });
        }
        else if (!this.game.acciones.ataqueEnCurso && this.collider !== null) {
            this.collider.destroy();
            this.collider = null;
        }

        this.fireRate -= dt;
        if (this.arrow !== null) {
            let angle = Phaser.Math.Angle.Between(this.enemy.body.center.x, this.enemy.body.center.y, this.arrow.x, this.arrow.y);
            this.arrow.setRotation(angle);
            this.game.physics.moveTo(this.arrow, this.enemy.body.center.x, this.enemy.body.center.y, 200);
        }
    }
    setMenu() {
        super.setMenu();
        this.initRangoSprite();
    }
    creaText() {
        this.texts = [];
        this.texts[0] = functions.creaTexto(this.marco.x + this.marco.width * 0.5, this.marco.y + this.marco.height * 0.29, this.aldeanosMax, this.game);
        this.texts[1] = functions.creaTexto(this.marco.x + this.marco.width * 0.58, this.marco.y + this.marco.height * 0.57, this.variacionAldeanos, this.game);
        this.texts[2] = functions.creaTexto(this.marco.x + this.marco.width * 0.86, this.marco.y + this.marco.height * 0.84, this.tipoAldeano.length, this.game);
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
            if (this.variacionAldeanos + this.numAldeanos < this.aldeanosMax && this.variacionAldeanos + 1 <= this.tipoAldeano.length) {
                this.variacionAldeanos++;
                console.log(this.numAldeanos);
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text--;
                this.texts[3].text = this.variacionAldeanos + this.numAldeanos;
            }
        })

        this.menos.on('pointerup', pointer => {
            if (this.variacionAldeanos + this.numAldeanos > 0) {
                this.variacionAldeanos--;
                console.log(this.numAldeanos);
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text++;
                this.texts[3].text = this.variacionAldeanos + this.numAldeanos;
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
                    this.tipoAldeano.pop().destroy();
                    this.numAldeanos++;
                }
            }
            this.variacionAldeanos = 0;
            this.game.cierraMarcoAnterior = () => { };
            this.abreMarcos();
            this.game.interfaz.actualizaInterfaz();
        })
    }
    muestraOpciones() {
        return () => {
            if (this.aldeanosAsignables) {
                this.marco.setVisible(!this.marco.visible);
                this.done.setVisible(!this.done.visible);
                this.texts[2].text = this.game.exploradores.length;
                this.mas.setVisible(!this.mas.visible);
                this.menos.setVisible(!this.menos.visible);
                for (let i of this.texts) {
                    i.setVisible(!i.visible);
                }
                this.texts[3].setVisible(true);
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }

    initRangoSprite() {
        let sprite = new Phaser.GameObjects.Sprite(this.game, this.posicion.x + this.ancho / 2 * config.sizeCasilla, this.posicion.y + this.alto / 2 * config.sizeCasilla, 'rangoCirculo');
        sprite.setDepth(config.rangosVisionDepth);
        this.game.add.existing(sprite);
        sprite.setScale(this.rango * 2, this.rango * 2);
        sprite.setOrigin(0.5, 0.5);
        sprite.alpha = 0.25;
        this.rangoSprite = sprite;
    }

    //Cuando lo destruimos nosotros
    destruir() {
        super.destruir();
        this.rangoSprite.destroy();
        if (this.arrow !== null) this.arrow.destroy();
    }

    recuperaAldeanos() {
        //CUANDO TERMINE EL ATAQUE SE LLAMARÁ A ESTE MÉTODO
        for (let i = 0; i < this.numAldeanos; i++) this.game.exploradores.push(this.game.creaAldeano());
        this.numAldeanos = 0;
    }
}