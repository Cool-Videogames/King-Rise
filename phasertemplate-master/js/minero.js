import Aldeano from "./aldeano.js";

export default class Minero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'minero');
        this.rendimiento.renOro = 20;
        this.createAnimationsMinero();
    }
    createAnimationsMinero(){
        this.game.anims.create({
            key: 'mineroEspaldas',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroEspaldas', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'mineroDerecha',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'mineroIzquierda',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'mineroFrente',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroFrente', {start: 0, end: 1}),
        });

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