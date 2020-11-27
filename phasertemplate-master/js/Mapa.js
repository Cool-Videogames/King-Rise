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

    }
    construyeMatriz(scene, sizeCasilla) {
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
                this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla);
                this.inputOnSprite(this.mapa[c][j], this.mapa[c][j].sprite);
            }
        }
    }
    printMapa() {
        for (let c = 0; c < this.x; c++) {
            for (let j = 0; j < this.y; j++) {
                this.mapa[c][j].printCell(c, j);
            }
        }
    }
    inputOnSprite(cell, sprite) {
        sprite.on('pointerdown', pointer => {

            this.jugador.MovePosition(cell.position);
            cell.setOcupada(!cell.estaOcupada);
            //console.clear();
        })
    }
    setJugador(jug) {
        this.jugador = jug;
    }

    algoritmoBusqueda() {
        let inicial = this.mapa.mapa[0][0];
        let final = this.mapa.mapa[3][10];
        this.i = 0;
        let a = [];
        a[this.xSize * this.ySize] = -1;
        this.addAdyancente(a, inicial);



    }

    addAdyancente(a, c) {
        if (x > 0 && !this.mapa[c.x - 1][c.y].estaOcupada) {

            this.i++;
        }
    }

    recursiva(a) {


    }

}
class Nodo {
    inicializar(posx, posy, rec, nodoAct, nodoDestino) {
        this.esFin = false; //bool
        this.esPrincipio = false; //bool
        this.visitada = false; //bool
        this.cellAct = cellAct; //celda
        this.x = posx; //int
        this.y = posy; //int
        this.distanciaRecorrida = rec; //int
        this.distanciaHastaElFinal = this.distanciaNodos(nodoDestino); //int
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal; //int
    }

    
    distanciaNodos(otro) {
        let diferenciaX = otro.x - this.x;
        let diferenciaY = otro.y - this.y;
        return Math.abs(diferenciaX) + Math.abs(diferenciaY);
    }

    areEqual(otro){
        return (this.x == otro.x && this.y == otro.y);
    }
}