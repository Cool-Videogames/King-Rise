import * as config from "./config.js"
import * as functions from "./functions.js";

export default class Cell {
    constructor(scene, x, y, indiceX, indiceY, key, flipHor, flipVer) {
        this.game = scene;

        this.x = x;
        this.y = y;
        this.key = key;

        this.indiceX = indiceX;
        this.indiceY = indiceY;
        this.ocupada = false;

        //Un sprite como atributo de la clase
        this.sprite = functions.creaSprite(x, y, this.key, scene, config.mapDepth);
        this.sprite.setScale(config.sizeCasilla / 32, config.sizeCasilla / 32);
        this.sprite.setFlip(flipHor, flipVer);

        this.tint = this.sprite.tint;
    }

    onClick(nextCell) {
        nextCell.sprite.on('pointerup', () => {
            if (!this.game.acciones.ataqueEnCurso)
                if (!nextCell.ocupada) {

                    if (!this.game.jug.isBuilding) {
                        let camino = this.game.mapa.pathFinding(this.game.jug.casilla, nextCell);
                        if (camino != null) {
                            this.game.jug.movimientoPathFinding(camino);
                        }
                    }
                    else {
                        let celdas = this.game.jug.edificio.celdas(this.game.casillaPuntero);
                        this.game.jug.edificio.posicion = this.game.casillaPuntero;

                        if (!this.game.jug.edificio.celdasOcupadas() && this.game.jug.edificio.esPagable() && this.game.jug.edificio.estaEnRangoDeConstruccion()) {
                            this.game.audio.construccion.play();
                            this.game.jug.edificio.setInteractive();
                            this.game.jug.edificio.cobraCoste();
                            this.game.interfaz.actualizaInterfaz();
                            this.game.jug.edificio.creaMarcoDestruir();
                            if (this.game.jug.edificio.hasMenu) {
                                this.game.jug.edificio.setMenu();
                            }
                            celdas.forEach(elem => { elem.sprite.tint = 0xE2A41F; elem.tint = 0xE2A41F; elem.ocupada = true; });
                            this.game.jug.isBuilding = false;
                            this.game.jug.edificio.addToScene();
                        }
                    }

                }

        })

    }

    changeColor(cell) {
        cell.sprite.on('pointerover', () => {
            this.game.casillaPuntero = cell;
            if (this.game.jug.isBuilding) {
                this.game.jug.posicionaEdificio(this.game.jug.edificio);
                this.game.jug.edificio.pintaCeldas();
            }
            else {
                if (!cell.ocupada)
                    cell.sprite.tint = 0x41EE7B;
                else cell.sprite.tint = 0xEE4141;
            }
        })

        cell.sprite.on('pointerout', () => {
            if (!this.game.jug.isBuilding)
                cell.sprite.tint = cell.tint;
        })
    }

    printCell(c, j) {
        console.log('x:' + c + ' y:' + j + '   Esta ocupada: ' + this.ocupada);
    }
}
