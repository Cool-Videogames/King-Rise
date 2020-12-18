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
    this.load.image('ajustes',"./phasertemplate-master/images/Interfaz/RuedaAjustes.png");
    this.load.image('hud', "./phasertemplate-master/images/Interfaz/HUDGeneral.png");
    this.load.image('desplegable', "./phasertemplate-master/images/Interfaz/desplegable.png");
    this.load.image('infoAldeanos', "./phasertemplate-master/images/Interfaz/InfoAldeanos.png");
    this.load.image('construir', "./phasertemplate-master/images/Interfaz/Construir.png");
    this.load.image('menuDesplegable', "./phasertemplate-master/images/Interfaz/MenuDesplegable.png");
    this.load.image('info', "./phasertemplate-master/images/Interfaz/Info.png")
    this.load.image('botonConstruir', "./phasertemplate-master/images/Interfaz/BotonConstruir.png")
    this.load.image('flecha', "./phasertemplate-master/images/Interfaz/Flecha.png")

    //Ajustes
    this.load.image('volveraljuego',"./phasertemplate-master/images/gestion.png");

    //Choza Maestra
    this.load.image('chozaMaestra',"./phasertemplate-master/images/Estructuras/ChozaMaestra/ChozaMaestra.png");
    this.load.image('marco', "./phasertemplate-master/images/Estructuras/ChozaMaestra/marco.png");
    this.load.image('done', "./phasertemplate-master/images/Estructuras/ChozaMaestra/Done.png");
    this.load.image('mas',"./phasertemplate-master/images/Estructuras/ChozaMaestra/Mas.png");
    this.load.image('menos',"./phasertemplate-master/images/Estructuras/ChozaMaestra/Menos.png");
    this.load.image('moneda',"./phasertemplate-master/images/Estructuras/ChozaMaestra/MonedaOro.png");
    
    //IGNORAR, SOLO DE PRUEBA
    this.load.image('edificio',"./phasertemplate-master/images/favicon.png");
  }

  create() {
    this.scene.start('game');
  }
}