import * as functions from "./functions.js"

var fondo; 
export default class EscenaInicio extends Phaser.Scene {
    
    constructor(){
        super({key: 'escenaInicio'});
        
        
    }
    preload(){

    }

    create(){
        this.fondo = new Phaser.GameObjects.Sprite(this,0,0, 'fondoInicio');
        this.fondo.setOrigin(0,0);
        this.fondo.setScale(1.3, 1);
        
        this.add.existing(this.fondo);
        //fondo = functions.creaSprite(0, 0, 'fondoInicio', this);
        
        //this.fondo = functions.creaSprite(1024, 0, 'fondoInicio', this);
        this.logo = new Phaser.GameObjects.Sprite(this,180,0, 'logoJuego');
        this.logo.setOrigin(0,0);
        this.logo.setScale(0.5, 0.5);
        this.add.existing(this.logo);
        this.jugar = functions.creaSprite(400, 500, 'jugar', this);
        
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