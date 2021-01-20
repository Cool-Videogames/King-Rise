import Aldeano from "./aldeano.js";
import * as config from "./config.js"

export default class Ganadero extends Aldeano{
    constructor(scene, casilla){
        super(scene, casilla, config.ganaderos.vida, config.ganaderos.dmg, 'ganadero');
        this.especialidad = 'ganadero';
    }
    animation(){
        if(this.dir === 'right'){
            this.play('ganaderoDerecha');
            this.flipX = true;
        }
        else if(this.dir === 'left'){
            this.play('ganaderoIzquierda');
            this.flipX = false;
        }
        else if(this.dir === 'up') this.play('ganaderoEspaldas');
        else if(this.dir === 'down') this.play('ganaderoFrente');
    }
    morir(){
        let index = this.game.ganaderos.indexOf(this);
        this.game.ganaderos.splice(index, 1);
        this.barraVida.destroy();
        this.destroy();
    }
}