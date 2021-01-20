import Aldeano from "./aldeano.js";
import * as config from "./config.js"

export default class Cantero extends Aldeano {
    constructor(scene, casilla) {
        super(scene, casilla, config.canteros.vida, config.canteros.dmg, 'cantero');
        this.especialidad = 'cantero';
    }

    animation() {
        if (this.dir === 'right') {
            this.play('derechaCantero');
            this.flipX = true;
        }
        else if (this.dir === 'left') {
            this.play('izquierdaCantero');
            this.flipX = false;
        }
        else if (this.dir === 'up') this.play('espaldasCantero');
        else if (this.dir === 'down') this.play('frenteCantero');
    }

    morir() {
        let index = this.game.canteros.indexOf(this);
        this.game.canteros.splice(index, 1);
        this.barraVida.destroy();
        this.destroy();
    }
}