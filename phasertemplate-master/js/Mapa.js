import Cell from "./Cell.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        this.x = x; this.y = y;
        let mapa = new Array(this.x);
        for (let i = 0; i < x; i++) {
            mapa[i] = new Array(this.y);
        }
        this.construyeMatriz(scene,mapa, sizeCasilla);
        this.printMapa(mapa);
    }
    construyeMatriz(scene, mapa, sizeCasilla) {
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
                mapa[c][j] = new Cell(scene, c*sizeCasilla, j*sizeCasilla);
                this.inputOnSprite(mapa[c][j],mapa[c][j].sprite,mapa);
            }
        }
    }
    printMapa(mapa){
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
               mapa[c][j].printCell(c,j);
            }
        }
    }
    inputOnSprite(cell, sprite, mapa) {
         sprite.on('pointerdown', pointer => {
            cell.setOcupada(!cell.estaOcupada);
            console.clear();
            this.printMapa(mapa);
        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }
}