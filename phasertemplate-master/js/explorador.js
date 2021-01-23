import Aldeano from "./aldeano.js";
import * as config from "./config.js"

export default class Explorador extends Aldeano {
    constructor(scene, casilla) {
        super(scene, casilla, config.exploradores.vida, config.exploradores.dmg, 'explorador');
        this.especialidad = 'explorador';
    }

    animation() {
        if (this.dir === 'right') {
            this.play('derechaExplorador');
            this.flipX = true;
        }
        else if (this.dir === 'left') {
            this.play('izquierdaExplorador');
            this.flipX = false;
        }
        else if (this.dir === 'up') this.play('espaldasExplorador');
        else if (this.dir === 'down') this.play('frenteExplorador');
    }

    morir() {
        let index = this.game.exploradores.indexOf(this);
        this.casilla.ocupada = false;
        this.game.exploradores.splice(index, 1);
        this.barraVida.destroy();
        this.destroy();
    }
}