import Game from "./game.js";

export default class Settings extends Phaser.Scene{
    constructor(){
        super({ key: "settings" });
    }
    preload(){
        this.cargaImagenes();
    }
    create(){
      this.volver = Game.global.creaSprite(400,400, 'volveraljuego', this);
      this.volveraljuego(this.volver);
      this.add.text(400,450," Volver\n al juego", {fontColor: 0xffff00, fontFamiliy: 'Quantico', fontSize: '14px', strokeThickness: 0});
    }
    update(){

    }
    volveraljuego(volverAlJuegoSprite){
        volverAlJuegoSprite.on('pointerdown', pointer => {
            this.scene.switch('interfaz');
            this.scene.wake('main');
        })
    }
    cargaImagenes(){
        this.load.image('volveraljuego',"phasertemplate-master/images/gestion.png");
    }
}