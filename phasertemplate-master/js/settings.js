//import * as functions from "./functions.js";
//import * as config from "./config.js"

export default class Settings {
    constructor(scene){
        this.game = scene;
        //this.background = new Phaser.GameObjects.Sprite(this.game, 0,0,'settingsBackGround');
        //this.background = functions.creaSprite(config.winWidth/2, config.winHeight/2, 'settingsBackground', this.game, config.hudDepth);
        //this.creaSettings();
    }
    muestraSettings(){
        console.log("HOLA");
    }
    /*ocultaSettings(){

    }
    creaSettings(){
       this.background = functions.creaSprite(config.winWidth/2, config.winHeight/2, 'settingsBackground', this.game, config.hudDepth);
       // this.background = functions.creaSprite(0,0,'settingsBackground', this.game, config.hudDepth);
       /*this.volver = functions.creaSprite(config.winWidth/2, config.winHeight/2, 'volveraljuego', this, config.hudDepth);
        this.volver.setOrigin(0.5,0.5);
        this.volver.setScale(2,2);
    }*/
}
