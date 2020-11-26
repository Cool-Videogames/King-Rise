import Cell from "./Cell.js";
import Vector2D from "./Vector2D.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        let jugador;
        let mapa = new Array(x);
        for (let i = 0; i < x; i++) {
            mapa[i] = new Array(y);
        }
        // Cell.size = sizeCasilla; 
        this.construyeMatriz(scene, x, y, mapa, sizeCasilla);

    }
    construyeMatriz(scene, x, y, mapa, sizeCasilla) {
        for (let c = 0; c < x; c++) {
            for (let j = 0; j < y; j++) {
                //mapa[j][c] = new Phaser.GameObjects.Sprite(scene,c*80, j*52,'cesped');
                mapa[c][j] = new Cell(c, j, sizeCasilla);
                //this.inputOnSprite(mapa[j][c], j, c);

            }
        }
    }
    inputOnSprite(sprite, j, c) {
        sprite.on('pointerdown', pointer => {
            console.log('x:' + j + ' y:' + c);
            this.jugador.MoveToPosition(c * 80, j * 50);
        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }


}