import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {
        super(scene, 0, 0, 'jugador');
        let iniCasilla = scene.mapa.mapa[casilla.x][casilla.y];
        let pos = this.posicionCentrada(iniCasilla);
        this.x = pos.x; this.y = pos.y;

        this.casilla = iniCasilla;
        this.casilla.setOcupada(true);
        this.speed = config.playerSpeed;

        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isMoving = false;
        this.posDestino = iniCasilla;
        this.dir = 'none';

        this.nodoDestino = null;
    }

    preUpdate(t, dt) {
        this.compruebaPosicion();
        super.preUpdate(t, dt);
    }

    compruebaPosicion() {
        if (!this.isMoving) {
            if (this.x > this.posDestino.x - 1 && this.x < this.posDestino.x + 1 && this.y > this.posDestino.y - 1 && this.y < this.posDestino.y + 1) {
                this.body.reset(this.posDestino.x, this.posDestino.y);
                this.isMoving = false;

                if (this.nodoDestino.siguiente !== null) {
                    this.movimientoPathFinding(this.nodoDestino.siguiente);
                }
            }
        }
    }

    posicionCentrada(cell) { //Devuelve un vector2 con la posicion centrada del jugador
        return new Vector2D(cell.x + config.sizeCasilla / 2,
            cell.y + config.sizeCasilla / 1.25);
    }

    movimientoPathFinding(camino) {
        this.nodoDestino = camino;
        this.posDestino = this.posicionCentrada(this.nodoDestino.cell);
        this.casilla.setOcupada(false);
        this.casilla.sprite.clearTint();

        this.casilla = this.nodoDestino.cell;
        this.casilla.setOcupada(true);

        if (this.casilla.sprite.isTinted) this.casilla.sprite.tint = 0xEE4141;

        this.isMoving = true;
        this.game.physics.moveTo(this, this.posDestino.x, this.posDestino.y, this.speed);
    }

    Construir(edificio, pos, tamanyo) {
    };
}
