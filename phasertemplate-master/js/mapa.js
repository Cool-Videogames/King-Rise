import Cell from "./cell.js";
import * as config from "./config.js";

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
                //ESQUINAS
                if(c === 0 && j === 0) {
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabanaEsquina', false, false); //Esquina
                }
                else if(c === this.col -1 && j === this.fil -1) {
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'esquinaMontania', true, true);
                }
                else if(c === 0 && j === this.fil-1){
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'esquinaMontania', false, true);
                }
                else if(c === this.col -1  && j === 0){
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'esquinaMontania', true, false);
                }

                //BORDES
                else if(c === 0){
                    if(j === config.interseccionMontañaMar) {
                        this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabanaInterseccionVer', false, true);
                    }
                    else if(j > config.interseccionMontañaMar) {
                        this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'montaniaBordeVer', true, false);
                    }
                    else this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabanaBordeHor', true, false);
                }
                else if(c === this.col -1){
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'montaniaBordeVer', false, false );
                }
                else if(j === 0){
                    if(c === config.interseccionMontañaMar) this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabanaInterseccionHor', false, false);
                    else if(c > config.interseccionMontañaMar)this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'montaniaBordeHor', false, false);
                    else this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabanaBordeVer', false, false);
                }
                else if(j === this.fil -1){
                    this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'montaniaBordeHor', false, true);
                }
                //RESTO
                else this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j, 'sabana', false, false);
                
                this.mapa[c][j].onClick(this.mapa[c][j]);
                this.mapa[c][j].changeColor(this.mapa[c][j]);
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
            return this.crearCamino(destino);
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
    addNodo(recorrido, nodoAdyacente, nodoAct) {
        if (!nodoAdyacente.visitada && !nodoAdyacente.cell.ocupada) {
            nodoAdyacente.recalcularValor(nodoAct);
            nodoAdyacente.visitada = true;
            recorrido.push(nodoAdyacente);
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

    crearCamino(nodoFinal) {
        let nodoAct = nodoFinal;
        let camino = new Camino(nodoAct, null);
        while (nodoAct !== null) {

            if (nodoAct.anterior !== null) {
                nodoAct.anterior.siguiente = nodoAct;

                if (nodoAct.siguiente !== null) {
                    camino.anterior = new Camino(nodoAct, camino);
                    camino = camino.anterior;
                } else {
                    camino.cell = nodoAct.cell;
                }
            }else{
                camino.anterior = new Camino(nodoAct, camino);
                camino = camino.anterior;
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
