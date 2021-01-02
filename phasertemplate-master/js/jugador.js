import ChozaMaestra from "./chozaMaestra.js";
import * as config from "./config.js";
import Vector2D from "./vector2D.js";
import Trampa from "./trampa.js";
import Muro from "./muro.js";
import TorreArqueros from "./torreArqueros.js";
import EdificioMina from "./edificioMina.js";
import EdificioGranja from "./edificioGranja.js";
import EdificioCantera from "./edificioCantera.js";
import PuestoVigilancia from "./puestoVigilancia.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {
        super(scene, 0, 0, 'jugador');
        let iniCasilla = scene.mapa.mapa[casilla.x][casilla.y];
        let pos = this.posicionCentrada(iniCasilla);
        this.x = pos.x; this.y = pos.y;

        this.casilla = iniCasilla;
        this.casilla.ocupada = true;
        this.speed = config.playerSpeed;

        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.personasDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isBuilding = false;
        this.edificio = null; //Edificio que se este construyendo en el momento

        this.isMoving = false;
        this.posDestino = iniCasilla;
        this.nodoDestino = null;
        this.dir = 'none';

        this.stopBuild = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); //tecla para dejar de construir
        this.createAnimations();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (Phaser.Input.Keyboard.JustDown(this.stopBuild) && this.isBuilding) {
            this.edificio.celdas(this.edificio.posicion).forEach(elem => elem.sprite.tint = elem.tint);
            this.game.casillaPuntero.sprite.tint = 0x41EE7B;
            this.isBuilding = false;
            if(this.edificio.key === 'chozaMaestra') {
                this.game.interfaz.sprites[this.game.interfaz.names.chozaMaestra].clearTint();
                this.game.numChozas--;
            }
            this.edificio.destroy();
            this.edificio = null;
        }
        this.compruebaPosicion();
        this.calculaDir();
    }

    createAnimations() {
        this.game.anims.create({
            key: 'espaldas',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('jugadorEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'derecha',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('jugadorLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'izquierda',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('jugadorLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'frente',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('jugadorFrente', { start: 0, end: 1 }),
        });
    }
    calculaDir() {
        let iniDir = this.dir;
        if (this.x < this.posDestino.x && this.dir !== 'right') this.dir = 'right';
        else if (this.x > this.posDestino.x && this.dir !== 'left') this.dir = 'left';
        else if (this.y < this.posDestino.y && this.dir !== 'down') this.dir = 'down';
        else if (this.y > this.posDestino.y && this.dir !== 'up') this.dir = 'up';

        if (iniDir !== this.dir || !this.isMoving) this.animation();
    }
    animation() {
        if (this.isMoving) {
            if (this.dir === 'right') {
                this.play('derecha');
                this.flipX = true;
            }
            else if (this.dir === 'left') {
                this.play('izquierda');
                this.flipX = false;
            }
            else if (this.dir === 'up') this.play('espaldas');
            else if (this.dir === 'down') this.play('frente');
        }
        else this.setTexture('jugador');
    }

    inputConstruir(spritename, especialidad, ancho, alto) {
        this.isBuilding = true;
        this.edificio = this.construir(spritename, especialidad, this.game.casillaPuntero, ancho, alto);
    }

    posicionaEdificio(edificio) {
        let pos = { x: 0, y: 0 };
        pos.x = this.game.casillaPuntero.x;
        pos.y = this.game.casillaPuntero.y;
        edificio.setPosition(pos);
    }

    compruebaPosicion() {
        if (this.isMoving) {
            if (this.x > this.posDestino.x - config.margenPosicion && this.x < this.posDestino.x + config.margenPosicion
                && this.y > this.posDestino.y - config.margenPosicion && this.y < this.posDestino.y + config.margenPosicion) {
                this.body.reset(this.posDestino.x, this.posDestino.y);
                this.isMoving = false;

                if (this.nodoDestino.siguiente !== null) {
                    this.game.acciones.movimiento();

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

        this.casilla.ocupada = false;
        this.casilla = this.nodoDestino.cell;
        this.casilla.ocupada = true;

        this.isMoving = true;
        this.game.physics.moveTo(this, this.posDestino.x, this.posDestino.y, this.speed);
    }

    construir(tipo, especialidad, pos, ancho, alto) {
        let edificio;
        if (tipo === 'recursos') {
            //scene,vida,coste,posicion,aldeanosMax,especialidad, key
            if (especialidad === 'mina') {
                edificio = new EdificioMina(this.game, 0, config.costeMina, pos, ancho, alto, config.alMaxMina, especialidad);
            }
            else if (especialidad === 'granja') {
                edificio = new EdificioGranja(this.game, 0, config.costeGranja, pos, ancho, alto, config.alMaxGranja, especialidad);
            }
            else if (especialidad === 'cantera') {
                edificio = new EdificioCantera(this.game, 0, config.costeCantera, pos, ancho, alto, config.alMaxCantera, especialidad);
            }
        }
        else if (tipo === 'social') {
            //scene,vida,coste,posicion,felicidad, key
            edificio = new EdificioSocial(this.game, 0, 0, pos, 10, 'edificio');
        }
        else if (tipo === 'chozaMaestra') {
            //scene,vida,coste,posicion, key
            edificio = new ChozaMaestra(this.game, 0,{ oro: 20, materiales: 0, comida: 0, felicidad: 0 }, pos, ancho, alto, tipo);
        }
        else if (tipo === 'defensivo') {
            //scene,especialidad,vida,coste,posicion,ancho,alto,aldeanosMax,rango, key
            console.log(especialidad);
            if (especialidad === 'trampaOsos' || especialidad === 'trampaSuelo')
                edificio = new Trampa(this.game, especialidad, 0, { oro: 20, materiales: 0, comida: 0, felicidad: 0 }, pos, ancho, alto, 0, 0, especialidad);
            else if (especialidad === 'muro')
                edificio = new Muro(this.game, especialidad, 0, { oro: 20, materiales: 0, comida: 0, felicidad: 0 }, pos, ancho, alto, 0, 0, especialidad);
            else if (especialidad === 'torreArqueros')
                edificio = new TorreArqueros(this.game, especialidad, 100, { oro: 20, materiales: 0, comida: 0, felicidad: 0 }, pos, ancho, alto, 5, 5, especialidad);
            else if (especialidad === 'puestoVigilancia')
                edificio = new PuestoVigilancia(this.game, especialidad, 100, { oro: 20, materiales: 0, comida: 0, felicidad: 0 }, pos, ancho, alto, 0, 3, especialidad);
        }
        return edificio;
    };
}
