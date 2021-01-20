import Persona from "./persona.js";
import * as config from "./config.js";

export default class Enemigo extends Persona {
    constructor(scene, pos, vida, fuerza, key) {
        super(scene, pos, vida, fuerza, key);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.objetivo = null;
        this.game = scene;
        ;
        this.body.setSize(this.width / 2, this.height / 4);
        this.body.setOffset(this.width / 4, this.height - this.body.height / 2);

        this.setOrigin(0.5, 0.5);
        this.setDepth(config.hudDepth - 1);

        this.timer = 0;
        this.trampa = null;
    }

    preUpdate(t, dt) {
        super.preUpdate();
        if (this.stuneado) {
            this.body.setVelocity(0);
            console.log("STUNEADO");
            this.timer--;
            if (this.timer <= 0) {
                this.stuneado = false;
                this.move();
                this.setTexture('frances');
                this.trampa.destruir();
                this.trampa = null;
            }
        }
        this.barraVida.x = this.x - this.barraVida.width / 4;
        this.barraVida.y = this.y + this.height;
        this.matar(dt);
    }

    juntarObjetivos() {
        return this.game.edificios.concat(this.game.aldeanosBasicos, this.game.mineros, this.game.exploradores,
            this.game.mineros, this.game.canteros);
    }

    morir() {
        super.morir();
        let index = this.game.oleadasEnemigos.currentWave.indexOf(this);
        this.game.oleadasEnemigos.currentWave.splice(index, 1);
        if (this.game.oleadasEnemigos.currentWave.length <= 0) this.game.acciones.nuevaRonda();
    }
}