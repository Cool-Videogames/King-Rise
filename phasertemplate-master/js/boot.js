export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    //Juego
    this.load.image('jugador', "./phasertemplate-master/images/Rey/ReyFrente.png");
    this.load.image('aldeano', "./phasertemplate-master/images/Aldeano/AldeanoFrente.png");
    this.load.image('sabana', "./phasertemplate-master/images/Sabana.png");

    //Interfaz
    this.load.image('ajustes',"./phasertemplate-master/images/RuedaAjustes.PNG")
    this.load.image('recursos', "./phasertemplate-master/images/Recursos.png");
    this.load.image('proxAtaque', "./phasertemplate-master/images/proxAtaque.png");
    this.load.image('desplegable', "./phasertemplate-master/images/gestion.png");
    this.load.image('construccion', "./phasertemplate-master/images/gestion.png");

    //Ajustes
    this.load.image('volveraljuego',"./phasertemplate-master/images/gestion.png");

    //Choza Maestra
    this.load.image('chozaMaestra',"./phasertemplate-master/images/Estructuras/ChozaMaestra.png");
    this.load.image('opMineros',"./phasertemplate-master/images/gestion.png");
    this.load.image('opGanaderos',"./phasertemplate-master/images/gestion.png");
    this.load.image('opCanteros',"./phasertemplate-master/images/gestion.png");
    this.load.image('opExploradores',"./phasertemplate-master/images/gestion.png");
    

    //IGNORAR, SOLO DE PRUEBA
    this.load.image('edificio',"./phasertemplate-master/images/favicon.png");
  }

  create() {
    this.scene.start('game');
  }
}