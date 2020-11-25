export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: "interfaz" });
    }
    preload(){
      this.load.image('ajustes',"phasertemplate-master/images/RuedaAjustes.png")
    }
    create(){
      let ajustes = new Phaser.GameObjects.Sprite(this,1000, 600, 'ajustes');
      ajustes.setOrigin(0,0);
      ajustes.setInteractive();
      this.add.existing(ajustes);
    }
    update(){
      
    }
}