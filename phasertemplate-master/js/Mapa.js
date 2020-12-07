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
        final.esFin = true;

        for (let i = 0; i < this.col; i++) {
            for (let c = 0; c < this.fil; c++) {
                this.nodos[i, c].cambiarDestino(final);
            }
        }

        let lista = [];
        this.addAdyancente(lista, inicial);

        let resultado = this.recursiva(lista);
    }
    addAdyancente(lista, nodoAct) {
        if (nodoAct.x > 0) {
            this.addNodo(lista, this.nodos[nodoAct.x - 1][nodoAct.y]);
        }
        if (nodoAct.x < this.col - 1) {
            this.addNodo(lista, this.nodos[nodoAct.x + 1][nodoAct.y]);
        }
        if (nodoAct.y > 0) {
            this.addNodo(lista, this.nodos[nodoAct.x][nodoAct.y - 1]);
        }
        if (nodoAct.y < this.fil - 1) {
            this.addNodo(lista, this.nodos[nodoAct.x][nodoAct.y + 1]);
        }

    }
    addNodo(lista, nodo) {
        if (!nodo.visitada && !nodo.cellAct.ocupada) {
            nodo.inicializar(nodoAct)
            lista.push(nodo);
        }
    }

    recursiva(lista) {
        if (lista.length <= 0) return null;

        let indice = 0;
        let nodoAct = lista[0];
        for (let i = 0; i < lista.length; i++) {
            if (nodoAct.valor < lista[i].valor) {
                nodoAct = lista[i];
                indice = i;
            }
        }

        if (nodoAct.esFin) return nodoAct;
        nodoAct.visitada = true;
        lista.splice(indice, 1);

        this.addAdyancente(lista, nodoAct);

        return this.recursiva(lista);
    }
}
class Nodo {
    constructor(celda) {
        this.esFin = false; //bool
        this.visitada = false; //bool
        this.cellAct = celda; //celda

        this.x = celda.indiceX; //int
        this.y = celda.indiceY; //int

        this.distanciaRecorrida = 0; //int
        this.distanciaHastaElFinal = 0; //int
        this.valor = 0; //int

        this.siguiente = null; //Nodo
        this.anterior = null; //Nodo
    }
    cambiarDestino(nodoDestino) {
        this.visitada = false;
        this.distanciaHastaElFinal = this.distanciaNodos(nodoDestino);
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal;
    }
    inicializar(nodoAnterior = null) {
        if (nodoAnterior != null) {
            this.distanciaRecorrida = nodoAnterior.distanciaRecorrida; //int
        }
        else {
            this.distanciaRecorrida = 0;
        }
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal; //int
        this.anterior = nodoAnterior;
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