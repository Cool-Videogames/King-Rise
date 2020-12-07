export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    //Juego
    this.load.image('jugador', "phasertemplate-master/images/Rey/ReyFrente.png");
    this.load.image('sabana', "phasertemplate-master/images/Sabana.png");

    this.load.image('ajustes',"phasertemplate-master/images/RuedaAjustes.PNG")
    this.load.image('recursos', "phasertemplate-master/images/Recursos.png");
    this.load.image('proxAtaque', "phasertemplate-master/images/proxAtaque.png");
    this.load.image('desplegable', "phasertemplate-master/images/gestion.png");
    this.load.image('construccion', "phasertemplate-master/images/gestion.png");

    this.load.image('volveraljuego',"phasertemplate-master/images/gestion.png");
  }

  create() {
    this.scene.start('game');
  }
}