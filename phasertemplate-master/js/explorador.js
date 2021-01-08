import Aldeano from "./aldeano.js";

export default class Explorador extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'explorador');
        this.rendimiento.rendGeneral = 20;
    }
    animation(){
        if(this.dir === 'right'){
            this.play('derechaExplorador');
            this.flipX = true;
        }
        else if(this.dir === 'left'){
            this.play('izquierdaExplorador');
            this.flipX = false;
        }
        else if(this.dir === 'up') this.play('espaldasExplorador');
        else if(this.dir === 'down') this.play('frenteExplorador');
    }
}