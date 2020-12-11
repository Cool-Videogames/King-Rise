import * as config from "./config.js"
import Cell from "./cell.js";

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
        this.isBuilding = false;

        this.sizeCasilla = sizeCasilla;
        this.construyeMatriz(scene, sizeCasilla);
        this.construyeNodos();

        this.checkTint = false;
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
                this.onClick(this.mapa[c][j]);
                this.changeColor(this.mapa[c][j]);
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
    onClick(nextCell) {
        nextCell.sprite.on('pointerup', () => {
            if (!nextCell.ocupada && !this.game.jug.isMoving) {
                let nodoInicial = this.pathFinding(this.game.jug.casilla, nextCell);
                if (nodoInicial != null) {
                    this.game.jug.movimientoPathFinding(nodoInicial);
                }
            }
        })
    }

    changeColor(cell){ 
        cell.sprite.on('pointerover', () => {
            if(!cell.ocupada )
                cell.sprite.tint = 0x41EE7B;
            else cell.sprite.tint = 0xEE4141;
        })
        cell.sprite.on('pointerout', () => {
            cell.sprite.clearTint();
        })
    }
    
    //ALGORITMO BUSQUEDA DE CAMINOS
    pathFinding(celdaInicial, celdaFinal) {
        let inicial = this.nodos[celdaInicial.indiceX][celdaInicial.indiceY];
        let destino = this.nodos[celdaFinal.indiceX][celdaFinal.indiceY]

        for (let i = 0; i < this.col; i++) {
            for (let c = 0; c < this.fil; c++) {
                this.nodos[i][c].resetear(destino);
            }
        }

        destino.esFin = true;
        destino.valor = 0;

        let recorrido = [];
        recorrido.push(inicial);
        inicial.visitada = true;

        if (this.pathFindingAux(recorrido)) { //camino encontrado
            this.crearCamino(destino);
            return inicial;
        } else { //camino no disponible
            return null;
        }
    }

    addAdyancente(recorrido, nodoAct) {
        if (nodoAct.x > 0) {
            this.addNodo(recorrido, this.nodos[nodoAct.x - 1][nodoAct.y], nodoAct);
        }
        if (nodoAct.x < this.col - 1) {
            this.addNodo(recorrido, this.nodos[nodoAct.x + 1][nodoAct.y], nodoAct);
        }
        if (nodoAct.y > 0) {
            this.addNodo(recorrido, this.nodos[nodoAct.x][nodoAct.y - 1], nodoAct);
        }
        if (nodoAct.y < this.fil - 1) {
            this.addNodo(recorrido, this.nodos[nodoAct.x][nodoAct.y + 1], nodoAct);
        }
    }
    addNodo(recorrido, nodoAddyacente, nodoAct) {
        if (!nodoAddyacente.visitada && !nodoAddyacente.cell.ocupada) {
            nodoAddyacente.recalcularValor(nodoAct);
            nodoAddyacente.visitada = true;
            recorrido.push(nodoAddyacente);
        }
    }

    pathFindingAux(recorrido) {
        if (recorrido.length <= 0) return false;

        let indice = 0;
        let nodoAct = recorrido[0];
        for (let i = 0; i < recorrido.length; i++) {
            if (nodoAct.valor > recorrido[i].valor) {
                nodoAct = recorrido[i];
                indice = i;
            }
        }

        if (nodoAct.esFin) {
            return true;
        }

        recorrido.splice(indice, 1);
        this.addAdyancente(recorrido, nodoAct);

        return this.pathFindingAux(recorrido);
    }


    iterativa(lista) {
        let numVueltas = 0;
        while (true) {
            if (lista.length <= 0) return null;
            let indice = 0;
            let nodoAct = lista[0];

            for (let i = 0; i < lista.length; i++) {
                if (nodoAct.valor > lista[i].valor) {
                    nodoAct = lista[i];
                    indice = i;
                }
            }

            if (nodoAct.esFin) {
                console.log(numVueltas);
                return nodoAct;
            }

            lista.splice(indice, 1);
            this.addAdyancente(lista, nodoAct);

            numVueltas++;
        }
    }


    crearCamino(nodoFinal) {
        let nodoAct = nodoFinal;
        let camino = new Nodo(nodoAct, null);
        while (nodoAct !== null) {

            if (nodoAct.anterior !== null) {
                nodoAct.anterior.siguiente = nodoAct;

                if (nodoAct.siguiente !== null) {
                    camino.anterior = new Camino(nodoAct, camino);
                    camino = camino.anterior;
                }else{
                    camino.cell = nodoAct.cell;
                }
            }
            nodoAct = nodoAct.anterior;
        }
        return camino;
    }

}

class Camino {
    constructor(nodo, caminoSiguiente = null) {
        this.siguiente = caminoSiguiente;
        this.cell = nodo.cell;
    }
}
class Nodo {
    constructor(celda) {
        this.esFin = false; //bool
        this.visitada = false; //bool

        this.cell = celda; //celda
        this.x = celda.indiceX; //int
        this.y = celda.indiceY; //int

        this.distanciaRecorrida = 0; //int
        this.distanciaHastaElFinal = 0; //int
        this.valor = 0; //int

        this.siguiente = null; //Nodo
        this.anterior = null; //Nodo
    }
    recalcularValor(nodoAnt) {
        this.anterior = nodoAnt;
        this.distanciaRecorrida = nodoAnt.distanciaRecorrida + 1;
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal;
    }
    resetear(destino) {
        this.visitada = false;
        this.esFin = false;

        this.distanciaRecorrida = 0;
        this.distanciaHastaElFinal = this.distanciaNodos(destino);
        this.valor = this.distanciaHastaElFinal;

        this.siguiente = null;
        this.anterior = null;
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
