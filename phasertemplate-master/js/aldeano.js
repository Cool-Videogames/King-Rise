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

        this.rendimiento = {
            rendGeneral: config.rendimientoGeneral,
            rendMateriales: 0,
            rendComida: 0,
            renOro: 0,
        }

        this.casilla = casilla
        this.casilla.ocupada = true;

        this.chico = key;
        this.game = scene;
        this.ocupado = false;
        this.dir = 'none';

        this.casillaRandom();
        this.movimientoPathFinding(this.nodoInicial);

        this.timer = 0;
        this.esperando = false;
        this.tiempoEspera = 1;

        this.createAnimationsChico();
        this.createAnimationsChica();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.compruebaPosicion(dt);
        this.calculaDir();
    }
    createAnimationsChico(){
        this.game.anims.create({
            key: 'espaldasAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoEspaldas', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'derechaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'izquierdaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'frenteAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoFrente', {start: 0, end: 1}),
        });
    }
    createAnimationsChica(){
        this.game.anims.create({
            key: 'espaldasAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaEspaldas', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'derechaAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'izquierdaAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'frenteAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaFrente', {start: 0, end: 1}),
        });

    }

    animation(){
        if(this.chico === 'aldeano'){
            if(this.dir === 'right'){
                this.play('derechaAldeano');
                this.flipX = true;
            }
            else if(this.dir === 'left'){
                this.play('izquierdaAldeano');
                this.flipX = false;
            }
            else if(this.dir === 'up') this.play('espaldasAldeano');
            else if(this.dir === 'down') this.play('frenteAldeano');
        }
        else {
            if(this.dir === 'right'){
                this.play('derechaAldeana');
                this.flipX = true;
            }
            else if(this.dir === 'left'){
                this.play('izquierdaAldeana');
                this.flipX = false;
            }
            else if(this.dir === 'up') this.play('espaldasAldeana');
            else if(this.dir === 'down') this.play('frenteAldeana');
        }
    }
    calculaDir(){
        let iniDir = this.dir;
        if(this.x < this.posDestino.x && this.dir !== 'right') this.dir = 'right';
        else if(this.x > this.posDestino.x && this.dir !== 'left') this.dir = 'left';
        else if(this.y < this.posDestino.y && this.dir !== 'down') this.dir = 'down';
        else if(this.y > this.posDestino.y && this.dir !== 'up') this.dir = 'up';

        if(iniDir !== this.dir || this.esperando) this.animation();
    }

    compruebaPosicion(dt) {
        if (this.x > this.posDestino.x - config.margenPosicion && this.x < this.posDestino.x + config.margenPosicion &&
            this.y > this.posDestino.y - config.margenPosicion && this.y < this.posDestino.y + config.margenPosicion) {
            this.body.reset(this.posDestino.x, this.posDestino.y);

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

    work() {
        this.ocupado = true;
    }

    stopWorking() {
        this.ocupado = false;
    }

    explore() {

    }

    especialice(espec, rendimiento) {
        switch (espec) {
            case "minero": { this.rendimientoMinero = rendimiento; this.rendimientoGeneral = 0; }
                break;
            case "cantero": { this.rendimientoCantero = rendimiento; this.rendimientoGeneral = 0; }
                break;
            case "ganadero": { this.rendimientoGanadero = rendimiento; this.rendimientoGeneral = 0; }
                break;
        }
    }
}
