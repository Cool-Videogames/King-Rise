import Cell from "./Cell.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        let mapa = new Array(x);
        for (let i = 0; i < x; i++) {
            mapa[i] = new Array(y);
        }
        this.construyeMatriz(scene,x, y, mapa);
    }
    construyeMatriz(scene,x, y, mapa) {
        for (let c = 0; c < x; c++) {
            for (let j = 0; j < y; j++) {
                mapa[c][j] = new Cell(scene, c*80, j*52);


                console.log(typeof(mapa[c][j]));


                //this.inputOnSprite(mapa[j][c].sprite, j, c);
            }
        }
    }
    inputOnSprite(sprite, j, c) {
        sprite.on('pointerdown', pointer => {
            console.log('x:' + j + ' y:' + c);
        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }
}