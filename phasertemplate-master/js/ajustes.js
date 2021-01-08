import * as config from "./config.js";
import * as functions from "./functions.js";

export default class Ajustes extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene,0,0,'');
        this.game = scene;
        this.visible = false;
        this.creaAjustes();
        this.muestraAjustes();
        this.mousePos = scene.input;

        this.vol = this.game.audio.mainSound.volume;
        this.ajusteVolumenIniPos = this.ajusteVolumen.x;
    }
    comportamientoAjustes(){
        this.game.audio.setVolumen(this.calculateVolumen(this.ajusteVolumen.x));
        if(!this.visible){
            if(this.game.input.mousePointer.isDown) {

                if(this.pulsado){
                    if(this.ajusteVolumen.x > config.limiteIzq && this.ajusteVolumen.x < config.limiteDer)
                        this.ajusteVolumen.x = this.mousePos.x;
                    else{
                        if(this.ajusteVolumen.x < this.ajusteVolumenIniPos)this.ajusteVolumen.x = config.limiteIzq+1;
                        else if(this.ajusteVolumen.x > this.ajusteVolumenIniPos) this.ajusteVolumen.x = config.limiteDer-1;
                    }
                }
            }
        }
    }
    muestraAjustes(){
        this.background.setVisible(this.visible);
        this.volver.setVisible(this.visible);
        this.volumen.setVisible(this.visible);
        this.ajusteVolumen.setVisible(this.visible);
        this.visible = !this.visible;
    }
    creaAjustes(){
        this.creaBackground();
        this.creaVolver(); 
        this.creaVolumen();
        this.creaAjusteVolumen();
    }
    clickEnVolver(volver){
        volver.on('pointerup', pointer=>{
            this.muestraAjustes();
        })
    }
    creaVolver(){
        this.volver = functions.creaSprite(config.winWidth/2, config.winHeight/1.8, 'volveraljuego', this.game, config.hudDepth);
        this.volver.setScrollFactor(0);
        this.volver.setOrigin(0.5,0.5);
        this.volver.setScale(2,2);
        this.clickEnVolver(this.volver);
    }
    creaBackground(){
        this.background = functions.creaSprite( config.winWidth/2, config.winHeight/2.5, 'settingsBackground',this.game, config.hudDepth);
        this.background.setScrollFactor(0);
        this.background.setOrigin(0.5, 0.5);
        this.background.setScale(1.2,1.2);
    }
    creaVolumen(){
        this.volumen = functions.creaSprite(config.winWidth/2, config.winHeight/3, 'volumen', this.game, config.hudDepth);
        this.volumen.setScrollFactor(0);
        this.volumen.setOrigin(0.5,0.5);
    }
    creaAjusteVolumen(){
        this.ajusteVolumen = functions.creaSprite(config.winWidth/2, config.winHeight/3+40, 'ajusteVolumen', this.game, config.hudDepth);
        this.ajusteVolumen.setScrollFactor(0);
        this.ajusteVolumen.setOrigin(0.5,0.5);
        this.moveAjusteVolume(this.ajusteVolumen);
    }
    moveAjusteVolume(ajusteVolumen){
        ajusteVolumen.on('pointerdown', pointer=>{
            //SE HA PULSADO DENTRO DEL SPRITE
            if(this.game.input.mousePointer.x > this.ajusteVolumen.x-this.ajusteVolumen.width/2){
                if(this.game.input.mousePointer.x < this.ajusteVolumen.x +this.ajusteVolumen.width/2){
                    if(this.game.input.mousePointer.y < this.ajusteVolumen.y + this.ajusteVolumen.height/2){
                        if(this.game.input.mousePointer.y > this.ajusteVolumen.y - this.ajusteVolumen.height/2){
                            this.pulsado = true;
                        }
                    }
                }
            }
        })
        ajusteVolumen.on('pointerup', pointer=>{
            this.pulsado = false;
        })
    }
    calculateVolumen(xPos){
        return this.vol*(xPos-config.limiteIzq)/100;
    }
}