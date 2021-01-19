import * as config from "./config.js"
import * as functions from "./functions.js";

export default class Persona extends Phaser.GameObjects.Sprite {
    constructor(scene, pos, vida, fuerza, key) {
        super(scene, pos.x, pos.y, key);
        this.game = scene;
        this.vidaMaxima = vida;
        this.vida = this.vidaMaxima;
        this.speed = config.playerSpeed;
        this.damage = fuerza;

        this.setOrigin(0.5, 1);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.personasDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.creaBarraVida();
        this.ancho = 1;
        this.alto = 1;

        this.destruido = false;
        this.t = 0;
        this.isInRange = false;
    }

    creaBarraVida() {
        this.barraVida = functions.creaSprite(this.x - this.width, this.y, 'barraVida', this.game, config.edificiosDepth + 1);
        this.barraVida.setPosition(this.barraVida.x, this.barraVida.y + this.barraVida.height / 2);
        this.barraVida.setDisplaySize(config.sizeCasilla, this.barraVida.height);
        this.barraVida.setOrigin(0, 0.5)
        this.barraATope = config.sizeCasilla;
        this.actualizaBarraVida();
    }

    actualizaBarraVida() {
        let ancho = (this.vida * this.barraATope) / this.vidaMaxima;
        this.barraVida.setDisplaySize(ancho, this.barraVida.height-this.barraVida.height/2);

        let porcentajeVida = (this.vida*100)/this.vidaMaxima;
        if(porcentajeVida> 60) this.barraVida.setTexture('barraVida');
        else if(porcentajeVida > 30) this.barraVida.setTexture('barraVidaNaranja');
        else this.barraVida.setTexture('barraVidaRoja');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.barraVida.x = this.x - this.barraVida.width / 4;
        this.barraVida.y = this.y + this.barraVida.height / 4;
    }

    morir() {
        this.barraVida.destroy();
        this.destroy();
    }

    matar(dt) {
        if (this.isInRange) {
            this.t += dt / 1000;

            if (this.objetivo.destruido) {
                this.isInRange = false;
                this.move()
            } else
                if (this.t > this.attackTime) {
                    if (this.ataque()) {
                        this.isInRange = false;
                        this.move();
                    }
                    this.t = 0;
                }
        } else {
            if (this.objetivo === null) return;

            let obj = { x: 0, y: 0 };
            this.objetivo.getCenter(obj);
            this.game.physics.moveTo(this, obj.x, obj.y, this.moveSpeed);

            let distancia = this.distanciaObjetivo();
            let rango = this.range + this.objetivo.ancho / 2 * config.sizeCasilla;
            if (distancia <= rango) {
                this.isInRange = true;
                this.body.reset(this.x, this.y);
            }
        }
    }

    ataque() {
        return this.objetivo.recibirAtaque(this.damage);
    }

    move() {
        this.objetivo = this.objetivoMasCercano(this.juntarObjetivos());
        if (this.objetivo !== null) {
            let obj = { x: 0, y: 0 };
            this.objetivo.getCenter(obj);
            if (this.objetivo !== null)
                this.game.physics.moveTo(this, obj.x, obj.y, this.moveSpeed);
        }
    }

    distanciaObjetivo() {
        if (this.objetivo === null) return;
        let obj = { x: 0, y: 0 };
        this.objetivo.getCenter(obj);

        let x = this.x - obj.x;
        let y = this.y - obj.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }
    objetivoMasCercano(objectives) {
        let index = -1;
        let value = Infinity;
        for (let i = 0; i < objectives.length; i++) {
            if (objectives[i].key !== 'bunker' && objectives[i].key !== 'trampaSuelo' && objectives[i].key !== 'trampaOsos') {
                let distancia = this.distancia({ x: objectives[i].x, y: objectives[i].y });
                if (distancia < value) {
                    index = i;
                    value = distancia;
                }
            }
        }

        if (index >= 0) return objectives[index];
        return null;
    }

    distancia(destino) {
        let x = this.x - destino.x;
        let y = this.y - destino.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }
    recibirAtaque(dmg) {
        this.vida -= dmg
        this.actualizaBarraVida();
        if (this.vida <= 0) {
            this.destruido = true;
            this.morir();
            return true;
        }
        return false;
    }
}
