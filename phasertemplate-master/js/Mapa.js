import Cell from "./Cell.js";
import Vector2D from "./Vector2D.js";

export default class Mapa {
    constructor(scene, x, y, sizeCasilla) {
        this.x = x; this.y = y;
        this.mapa = new Array(this.x);

        this.position = new Vector2D(2, 2);
        for (let i = 0; i < x; i++) {
            this.mapa[i] = new Array(this.y);
        }

        this.construyeMatriz(scene, sizeCasilla);

        this.printMapa();
    }
    construyeMatriz(scene, sizeCasilla) {
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
                this.mapa[c][j] = new Cell(scene, c*sizeCasilla, j*sizeCasilla);
                this.inputOnSprite(this.mapa[c][j],this.mapa[c][j].sprite);
            }
        }
    }
    printMapa(){
        return;
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
               this.mapa[c][j].printCell(c,j);
            }
        }
    }
    inputOnSprite(cell, sprite) {
         sprite.on('pointerdown', pointer => {

            this.position.print();

            this.jugador.MovePosition(cell.position);
            cell.setOcupada(!cell.estaOcupada);
            //console.clear();
            this.printMapa();


        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }
}