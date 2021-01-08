import Aldeano from "./aldeano.js";

export default class Ganadero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'ganadero');
        this.rendimiento.rendComida = 20;
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
}