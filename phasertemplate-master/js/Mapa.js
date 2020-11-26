import Cell from "./Cell.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        let mapa = new Array(x);
        for (let i = 0; i < x; i++) {
            mapa[i] = new Array(y);
        }
        this.construyeMatriz(scene,x, y, mapa, sizeCasilla);
    }
    construyeMatriz(scene,x, y, mapa, sizeCasilla) {
        for (let c = 0; c < x; c++) {
            for (let j = 0; j < y; j++) {
                mapa[c][j] = new Cell(scene, c*sizeCasilla, j*sizeCasilla);
                console.log(typeof(mapa[c][j].sprite));
                this.inputOnSprite(mapa[c][j].sprite, c, j);
            }
        }
    }
    inputOnSprite(sprite, c, j) {
         sprite.on('pointerdown', pointer => {
            console.log('x:' + c + ' y:' + j);
        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }
}