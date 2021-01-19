import Aldeano from "./aldeano.js";

export default class Cantero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'cantero');
        this.rendimiento.rendMateriales = 20;
    }
    animation(){
        if(this.dir === 'right'){
            this.play('derechaCantero');
            this.flipX = true;
        }
        else if(this.dir === 'left'){
            this.play('izquierdaCantero');
            this.flipX = false;
        }
        else if(this.dir === 'up') this.play('espaldasCantero');
        else if(this.dir === 'down') this.play('frenteCantero');
    }

     morir(){
        let index = this.game.canteros.indexOf(this);
        this.game.canteros.splice(index, 1);
        this.destroy();
    }
}