import Aldeano from "./aldeano.js";

export default class Cantero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'aldeano');
        this.rendimiento.rendMateriales = 20;
        this.createAnimationsCantero();
    }
    //FALTAN LAS ANIMACIONES, ESTAN PUESTAS LAS DEL ALDEANO POR DEFECTO
    createAnimationsCantero(){
        this.game.anims.create({
            key: 'espaldasAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoEspaldas', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'derechaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'izquierdaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'frenteAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoFrente', {start: 0, end: 1}),
        });
    }
    animation(){
        if(this.dir === 'right'){
            this.play('derechaAldeano');
            this.flipX = true;
        }
        else if(this.dir === 'left'){
            this.play('izquierdaAldeano');
            this.flipX = false;
        }
        else if(this.dir === 'up') this.play('espaldasAldeano');
        else if(this.dir === 'down') this.play('frenteAldeano');
    }
}