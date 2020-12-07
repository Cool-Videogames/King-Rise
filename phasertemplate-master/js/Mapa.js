import * as config from "./config.js"
import Cell from "./cell.js";
import Vector2D from "./vector2D.js";

export default class Mapa {
    constructor(scene, col, fil, sizeCasilla) {
        this.col = col; this.fil = fil;
        this.mapa = new Array(this.col);
        for (let i = 0; i < col; i++) {
            this.mapa[i] = new Array(this.fil);
        }

        this.nodos = new Array(this.col);
        for (let i = 0; i < col; i++) {
            this.nodos[i] = new Array(this.fil);
        }

        this.game = scene;

        this.sizeCasilla = sizeCasilla;
        this.construyeMatriz(scene, sizeCasilla);
        this.construyeNodos();

        this.algoritmoBusqueda();
    }
    construyeNodos() {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.nodos[c][j] = new Nodo(this.mapa[c][j]);
            }
        }
    }

    construyeMatriz(scene, sizeCasilla) {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j);
                this.movePlayer(this.mapa[c][j], this.mapa[c][j].sprite);
            }
        }
    }

    printMapa() {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.mapa[c][j].printCell(c, j);
            }
        }
    }

    //POSTERIORMENTE HAY QUE CAMBIARLO Y DAR UNA FUNCIÓN COMO PARÁMETRO (EJ: PARA CONSTRUIR AL PULSAR Y QUE NO MUEVA AL JUGADOR)
    movePlayer(nextCell, sprite) {
        sprite.on('pointerdown', () => {
            let pos = new Vector2D(nextCell.x + this.sizeCasilla / 2, nextCell.y + this.sizeCasilla / 1.25);

            this.game.jug.casilla.setOcupada(false);

            if (!nextCell.ocupada) {
                this.game.jug.move(pos, nextCell);
                nextCell.setOcupada(true);
            }
        })
    }

    //ALGORITMO BUSQUEDA DE CAMINOS
    algoritmoBusqueda() {
        let inicial = this.nodos[1][1];

        let final = this.nodos[3][10];
        inicial.esPrincipio = true;
        final.esFin = true;
        let lista = [];
        this.addAdyancente(lista, inicial);
    }
    addAdyancente(lista, celda) {
        if (celda.x > 0 && !this.nodos[celda.indiceX - 1][celda.indiceY].visitada) {
            lista.push(this.nodos[celda.indiceX - 1][celda.indiceY]);
        }
        if (celda.x < this.col - 1 && !this.nodos[celda.indiceX + 1][celda.indiceY].visitada) {
            lista.push(this.nodos[celda.indiceX + 1][celda.y]);
        }

        if (celda.y > 0 && !this.nodos[celda.indiceX][celda.indiceY - 1].visitada) {
            lista.push(this.nodos[celda.indiceX][celda.indiceY - 1]);
        }
        if (celda.y < this.fil - 1 && !this.nodos[celda.indiceX][celda.indiceY + 1].visitada) {
            lista.push(this.nodos[celda.indiceX][celda.indiceY + 1]);
        }
    }

    recursiva(a) {
    }
}
class Nodo {
    constructor(celda) {
        this.esFin = false; //bool
        this.esPrincipio = false; //bool
        this.visitada = false; //bool
        this.cellAct = celda; //celda
        this.x = celda.x; //int
        this.y = celda.y; //int
        this.distanciaRecorrida = 0; //int
        this.distanciaHastaElFinal = 0; //int
        this.valor = 0; //int
    }
    inicializar(posx, posy, rec, nodoDestino) {
        this.visitada = true; //bool
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
    areEqual(otro) {
        return (this.x == otro.x && this.y == otro.y);
    }
}