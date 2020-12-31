import Aldeano from "./aldeano.js";

export default class Ganadero extends Aldeano{
    constructor(scene, casilla, vida, fuerza){
        super(scene, casilla, vida, fuerza, 'ganadero');
        this.rendimiento.rendComida = 20;
        this.createAnimationsGanadero();
    }
    createAnimationsGanadero(){
        this.game.anims.create({
            key: 'ganaderoEspaldas',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoEspaldas', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'ganaderoDerecha',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'ganaderoIzquierda',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoLado', {start: 0, end: 1}),
        });
        this.game.anims.create({
            key: 'ganaderoFrente',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoFrente', {start: 0, end: 1}),
        });

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