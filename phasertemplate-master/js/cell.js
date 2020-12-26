import * as config from "./config.js"

export default class Cell {
    constructor(scene, x, y, indiceX, indiceY) {
        this.game = scene;

        this.x = x;
        this.y = y;

        this.indiceX = indiceX;
        this.indiceY = indiceY;

        this.ocupada = false;

        //Un sprite como atributo de la clase
        this.sprite = new Phaser.GameObjects.Sprite(scene, x, y, 'sabana');
        this.sprite.setScale(config.sizeCasilla / 32, config.sizeCasilla / 32);
        this.sprite.setOrigin(0, 0);
        this.sprite.setInteractive();
        this.sprite.setDepth(config.mapDepth);
        scene.add.existing(this.sprite);

        this.tint = this.sprite.tint;
    }


    onClick(nextCell) {
        nextCell.sprite.on('pointerup', () => {
            if (!nextCell.ocupada) {

                if (!this.game.jug.isBuilding) {
                    let camino = this.game.mapa.pathFinding(this.game.jug.casilla, nextCell);
                    if (camino != null) {
                        this.game.jug.movimientoPathFinding(camino);
                    }
                } else if (this.game.jug.isBuilding) {
                    let celdas = this.game.jug.edificio.celdas();
                    this.game.jug.edificio.posicion = this.game.casillaPuntero;

                    if (!this.game.jug.edificio.celdasOcupadas() && this.game.jug.edificio.esPagable() && this.game.jug.edificio.estaEnRangoDeConstruccion()) {
                        this.game.jug.edificio.setInteractive();
                        this.game.jug.edificio.cobraCoste();
                        this.game.interfaz.actualizaInterfaz();

                        if (this.game.jug.edificio.key === 'chozaMaestra') this.game.jug.edificio.setMenu();
                        celdas.forEach(elem => { elem.sprite.tint = 0xE2A41F; elem.tint = 0xE2A41F; elem.ocupada =true; });
                        this.game.jug.isBuilding = false;
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
