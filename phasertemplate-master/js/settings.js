//CLASE HECHA UNICAMENTE PARA TESTEAR LA INTERFAZ, SE PUEDE PARTIR DE ESTO PARA HACER LOS AJUSTES
export default class Settings extends Phaser.Scene{
    constructor(){
        super({ key: "settings" });
    }

    create(){
      this.volver = new Phaser.GameObjects.Sprite(this,600,250, 'volveraljuego');
      this.volver.setOrigin(0,0);
      this.volver.setInteractive();
      this.add.existing(this.volver);
      this.volveraljuego(this.volver);
      this.add.text(600,250," Volver\n al juego", {fontColor: 0xffff00, fontFamiliy: 'Quantico', fontSize: '14px', strokeThickness: 0});
    }
    update(){

    }
    volveraljuego(volverAlJuegoSprite){
        volverAlJuegoSprite.on('pointerdown', pointer => {
            this.scene.switch('game');
        })
    }
}
