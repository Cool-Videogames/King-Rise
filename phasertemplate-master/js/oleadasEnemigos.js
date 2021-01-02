import EnemigoMele from "./enemigoMele.js";
import Vector2D from "./vector2D.js";
import * as config from "./config.js";

export default class OleadasEnemigos {

    constructor(scene) {
        this.game = scene;
    }

    createWave(numberOfEnemies, dir) {
        this.currentWave = [];

        for (let i = 0; i < numberOfEnemies; i++) {
            this.currentWave.push(this.createMeleeEnemy(dir));
        }
    }

    randomPosition(dir) {

        let x, y;
        if (dir) {
            x =  config.columnas * config.sizeCasilla;
            y = Math.random() * config.filas * config.sizeCasilla;
        } else {
            x = Math.random() * config.columnas * config.sizeCasilla;
            y =  config.filas * config.sizeCasilla;
        }

        return new Vector2D(x, y);
    }

    createMeleeEnemy(dir) {
        return new EnemigoMele(this.game, this.randomPosition(dir));
    }
}

