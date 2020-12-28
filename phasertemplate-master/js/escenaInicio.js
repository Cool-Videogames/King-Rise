import * as functions from "./functions.js"

export default class EscenaInicio extends Phaser.Scene {
    constructor(){
        super({key: 'escenaInicio'});
        
    }
    preload(){

    }

    create(){
        this.jugar = functions.creaSprite(450, 250, 'jugar', this);
        
        this.comenzarJuego(this.jugar);
        this.changeColorJugar(this.jugar);
        
        console.log("escenaInicio");
    }
    update(time, delta){
        
    }

    comenzarJuego(jugar){
        jugar.on('pointerup', pointer => {
            //var isActivee = scene.scene.isSleeping('game');
            this.scene.start('game');
            /*if(!isActivee)
            this.scene.start('game');
            else
            this.scene.resume('game');*/
        })
    }

    changeColorJugar(botonJugar){
        botonJugar.on('pointerover', pointer => {
            botonJugar.tint = 0x41EE7B;
        })

        botonJugar.on('pointerout', pointer => {
            botonJugar.tint = botonJugar.tint;
        })

    }
}