import * as functions from "./functions.js"
import * as config from "./config.js"
import AudioManager from "./audioManager.js";

export default class EscenaInicio extends Phaser.Scene {
    constructor(){
        super({key: 'escenaInicio'});
    }

    create(){
        this.audio = new AudioManager(this);
        this.audio.menuInicio.play();
        this.fondo = functions.creaSprite(0, 0, 'fondoInicio', this ,0);
        this.fondo.setScale(1.3, 1);
        
        this.logo = functions.creaSprite( 350, 100, 'logoJuego', this, 0);
        this.add.existing(this.fondo);
        //fondo = functions.creaSprite(0, 0, 'fondoInicio', this);
        
        //this.fondo = functions.creaSprite(1024, 0, 'fondoInicio', this);
        //this.logo = new Phaser.GameObjects.Sprite(this,350,100, 'logoJuego');
        this.logo.setOrigin(0,0);
        this.logo.setScale(0.5, 0.5);

        this.jugar = functions.creaSprite(0, 0, 'jugar', this);
        this.jugar.setPosition(config.winWidth/2-this.jugar.width/2,config.winHeight/2+this.jugar.height/2);
        
        this.comenzarJuego(this.jugar);
        this.changeColorJugar(this.jugar);
    }
    comenzarJuego(jugar){
        jugar.on('pointerup', pointer => {
            //var isActivee = scene.scene.isSleeping('game');
            this.audio.menuInicio.stop();
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