import Aldeano from "./aldeano.js";
import * as config from "./config.js"

export default class Minero extends Aldeano{
    constructor(scene, casilla){
        super(scene, casilla, config.mineros.vida, config.mineros.dmg, 'minero');
        this.especialidad = 'minero';
    }
    
    animation(){
        if(this.dir === 'right'){
            this.play('mineroDerecha');
            this.flipX = true;
        }
        else if(this.dir === 'left'){
            this.play('mineroIzquierda');
            this.flipX = false;
        }
        else if(this.dir === 'up') this.play('mineroEspaldas');
        else if(this.dir === 'down') this.play('mineroFrente');
    }
    morir(){
        this.barraVida.destroy();
        let index = this.game.mineros.indexOf(this);
        this.game.mineros.splice(index, 1);
        this.casilla.ocupada = false;
        this.destroy();
    }
}