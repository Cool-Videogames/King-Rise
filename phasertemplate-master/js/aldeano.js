import * as config from "./config.js"
import Persona from "./persona.js"
import Vector2D from "./vector2D.js";

export default class Aldeano extends Persona {
    constructor(scene, casilla, vida, fuerza, key) {
        let pos = { x: 0, y: 0 };
        super(scene, pos, vida, fuerza, key);
        pos = this.posicionCentrada(casilla);
        this.x = pos.x;
        this.y = pos.y;

        this.casilla = casilla
        this.casilla.ocupada = true;

        this.chico = key;
        this.game = scene;
        this.ocupado = false;
        this.dir = 'none';

        this.especialidad = 'aldeano';

        this.casillaRandom();
        this.movimientoPathFinding(this.nodoInicial);

        this.timer = 0;
        this.esperando = false;
        this.tiempoEspera = 1;

        this.modoAtaque = false;
        this.continuaAnimacion = false;

        this.moveSpeed = 130;
        this.range = 2;
        this.attackTime = config.enemigo.cadencia - 1;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (!this.modoAtaque) {
            this.compruebaPosicion(dt);
            if (this.continuaAnimacion)
                this.calculaDir();
        } else {
            this.matar(dt);
        }
    }


    juntarObjetivos() {
        return this.game.oleadasEnemigos.currentWave;
    }

    animation() {
        if (this.chico === 'aldeano') {
            if (this.dir === 'right') {
                this.play('derechaAldeano');
                this.flipX = true;
            }
            else if (this.dir === 'left') {
                this.play('izquierdaAldeano');
                this.flipX = false;
            }
            else if (this.dir === 'up') this.play('espaldasAldeano');
            else if (this.dir === 'down') this.play('frenteAldeano');
        }
        else {
            if (this.dir === 'right') {
                this.play('derechaAldeana');
                this.flipX = true;
            }
            else if (this.dir === 'left') {
                this.play('izquierdaAldeana');
                this.flipX = false;
            }
            else if (this.dir === 'up') this.play('espaldasAldeana');
            else if (this.dir === 'down') this.play('frenteAldeana');
        }

    }

    activarModoAtaque(bool = true) {
        this.modoAtaque = bool;
        if (bool) {
            this.anims.stop();
            this.continuaAnimacion = false;
            this.setTexture(this.especialidad);
            this.move();
        }
        else {
            this.vida = this.vidaMaxima;
            this.actualizaBarraVida();
            this.body.reset(this.x, this.y);
            this.isInRange = false;
            this.movimientoPathFinding(this.nodoInicial);
        }
    }

    calculaDir() {
        let iniDir = this.dir;
        if (this.x < this.posDestino.x && this.dir !== 'right') this.dir = 'right';
        else if (this.x > this.posDestino.x && this.dir !== 'left') this.dir = 'left';
        else if (this.y < this.posDestino.y && this.dir !== 'down') this.dir = 'down';
        else if (this.y > this.posDestino.y && this.dir !== 'up') this.dir = 'up';

        if (iniDir !== this.dir || this.esperando) this.animation();
    }

    compruebaPosicion(dt) {
        if (this.x > this.posDestino.x - config.margenPosicion && this.x < this.posDestino.x + config.margenPosicion &&
            this.y > this.posDestino.y - config.margenPosicion && this.y < this.posDestino.y + config.margenPosicion) {
            this.body.reset(this.posDestino.x, this.posDestino.y);
            this.continuaAnimacion = true;
            if (this.nodoDestino.siguiente !== null) {
                this.movimientoPathFinding(this.nodoDestino.siguiente);
            }
            else {
                if (!this.esperando) {
                    this.timer = 0;
                    this.tiempoEspera = 2 + Math.random() * 5;
                    this.esperando = true;
                }
                this.timer += dt / 1000;

                if (this.timer > this.tiempoEspera) {
                    this.casillaRandom();
                    this.movimientoPathFinding(this.nodoInicial);
                    this.esperando = false;
                }
            }
        }
    }

    casillaRandom() {
        let nextCell;
        let nodoInicial;
        do {
            let columna = Math.floor(Math.random() * config.columnas);
            let fila = Math.floor(Math.random() * config.filas);
            nextCell = this.game.mapa.mapa[columna][fila];
            nodoInicial = this.game.mapa.pathFinding(this.casilla, nextCell);
        }
        while (nextCell.ocupada || nodoInicial === null);
        this.nodoInicial = nodoInicial;
    }

    movimientoPathFinding(camino) {
        this.nodoDestino = camino;
        this.posDestino = this.posicionCentrada(this.nodoDestino.cell);
        this.casilla.ocupada = false;

        this.casilla = this.nodoDestino.cell;
        this.casilla.ocupada = true;

        this.isMoving = true;
        this.game.physics.moveTo(this, this.posDestino.x, this.posDestino.y, this.speed);
    }

    posicionCentrada(cell) { //Devuelve un vector2 con la posicion centrada del jugador
        return new Vector2D(cell.x + config.sizeCasilla / 2,
            cell.y + config.sizeCasilla / 1.25);
    }

    morir() {
        let index = this.game.aldeanosBasicos.indexOf(this);
        this.casilla.ocupada = false;
        this.game.aldeanosBasicos.splice(index, 1);
        this.barraVida.destroy();
        this.destroy();
    }
}
