import ChozaMaestra from "./chozaMaestra.js";
import * as config from "./config.js";
import EdificioRecursos from "./edificioRecursos.js";
import EdificioDefensivo from "./edificioDefensivo.js";
import Vector2D from "./vector2D.js";

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
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isBuilding = false;
        //Edificio que se este construyendo en el momento
        this.edificio = null;

        this.isMoving = false;
        this.posDestino = iniCasilla;
        this.nodoDestino = null;
        this.dir = 'none';

        this.stopBuild = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); //tecla para dejar de construir
    }

    preUpdate(t, dt) {
        if (Phaser.Input.Keyboard.JustDown(this.stopBuild) && this.isBuilding) {
            this.celdasEdificio(this.edificio).forEach(elem => elem.sprite.tint = elem.tint);
            this.game.casillaPuntero.sprite.tint = 0x41EE7B;
            this.isBuilding = false;
            this.edificio.destroy();
            this.edificio = null;
        }

        if (this.isBuilding) {
            this.posicionaEdificio(this.edificio);
        }
        this.compruebaPosicion();
        super.preUpdate(t, dt);
    }

    inputConstruir(spritename) {
        this.isBuilding = true;
        this.edificio = this.construir(spritename, '', this.game.casillaPuntero, 3, 3);
    }

    posicionaEdificio(edificio) {
        let pos = { x: 0, y: 0 };
        pos.x = this.game.casillaPuntero.x;
        pos.y = this.game.casillaPuntero.y;
        edificio.setPosition(pos);
    }

    compruebaPosicion() {
        if (this.isMoving) {
            if (this.x > this.posDestino.x - 1 && this.x < this.posDestino.x + 1
                && this.y > this.posDestino.y - 1 && this.y < this.posDestino.y + 1) {
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
        this.game.acciones.movimiento();
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
            edificio = new EdificioRecursos(this.game, 0, 0, pos, ancho, alto, 5, especialidad, 'edificio');
        }
        else if (tipo === 'social') {
            //scene,vida,coste,posicion,felicidad, key
            edificio = new EdificioSocial(this.game, 0, 0, pos, 10, 'edificio');
        }
        else if (tipo === 'chozaMaestra') {
            //scene,vida,coste,posicion, key
            edificio = new ChozaMaestra(this.game, 0, 0, pos, ancho, alto, tipo);
        }
        else if (tipo === 'defensivo') {
            //scene,vida,coste,posicion,aldeanosMax,rango
            edificio = new EdificioDefensivo(this.game, 0, 0, pos, 2, 0);
        }
        return edificio;
    };
}
