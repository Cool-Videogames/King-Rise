import Aldeano from "./aldeano.js";

export default class Minero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'minero');
        this.rendimiento.renOro = 20;
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
}