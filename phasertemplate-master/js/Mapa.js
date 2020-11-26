import Cell from "./Cell.js";
import Vector2D from "./Vector2D.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        let jugador;
        let mapa = new Array(x);
        for (let i = 0; i < x; i++) {
            mapa[i] = new Array(y);
        }
        this.construyeMatriz(scene, x, y, mapa, sizeCasilla);
    }

    construyeMatriz(scene, x, y, mapa, sizeCasilla) {
        for (let c = 0; c < x; c++) {
            for (let j = 0; j < y; j++) {
                mapa[j][c] = new Cell(scene, j, c, sizeCasilla);
                this.inputOnSprites(mapa, j, c);
            }
        }
    }
    // inputOnSprites(sprite, j, c) {
    //     sprite.on('pointerdown', pointer => {
    //         console.log('x:' + j + ' y:' + c);
    //         this.jugador.MoveToPosition(j, c);
    //     })
    // }
    inputOnSprites(mapa, j, c) {
        console.log(mapa[j][c]);
        mapa[j][c].on('pointerdown', pointer => {
            console.log('x:' + j + ' y:' + c);
            this.jugador.MoveToPosition(j, c);
        })
    }

    setJugador(jug) {
        this.jugador = jug;
    }


}