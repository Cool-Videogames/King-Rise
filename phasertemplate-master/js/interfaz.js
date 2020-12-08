import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays con la informacion
    this.namesEnum = { ajustes: 0, desplegable: 1, proxAtaque: 2, recursos: 3, construccion: 4}
    this.sprites = new Array(config.numHUDSprites);
    this.texts = new Array(config.numHUDTexts);
    this.nombres = new Array(config.numHUDSprites);
    this.posiciones = new Array(config.numHUDSprites);

    this.alturaInterfaz = this.game.getySize()-this.game.getySize()/6;
    this.horizontalInterfaz = 1.5;
    this.crea();
  }
  crea(){
    this.initArrayNombres(); this.initArrayPosiciones(); this.initArrayTexts(); //inicia los arrays de informacion

    for(let i = 0;i<config.numHUDSprites;i++){
      this.sprites[i] = this.game.creaSprite(this.posiciones[i].x, this.posiciones[i].y, this.nombres[i], this.game);
      this.sprites[i].setDepth(config.hudDepth); //Profundidad de los sprites
      this.sprites[i].setScrollFactor(0);
    }
    //Logica de la interfaz
    this.sprites[this.namesEnum.construccion].setVisible(false);
    this.clickEnAjustes(this.sprites[this.namesEnum.ajustes]);
    this.clickEnDesplegable(this.sprites[this.namesEnum.desplegable]);
  }
  initArrayNombres(){
    this.nombres[this.namesEnum.ajustes] = 'ajustes'; this.nombres[this.namesEnum.recursos] = 'recursos'; 
    this.nombres[this.namesEnum.proxAtaque] = 'proxAtaque'; this.nombres[this.namesEnum.desplegable] = 'desplegable';
    this.nombres[this.namesEnum.construccion] = 'construccion';
  }
  initArrayTexts(){
    //Variables locales para acortar el codigo
    let a = this.game; let b = this.texts; let c = this.namesEnum; let d = this.posiciones;

    //TEXTO PARA INDICAR LOS RECURSOS
    b[0] = a.add.text(d[c.recursos].x + 50, d[c.recursos].y, a.recursos.oro,config.fontColor); 
    b[1] = a.add.text(d[c.recursos].x + 100, d[c.recursos].y, a.recursos.comida,config.fontColor); 
    b[2] = a.add.text(d[c.recursos].x + 50, d[c.recursos].y + 100, a.recursos.materiales,config.fontColor);
    b[3] = a.add.text(d[c.recursos].x + 100, d[c.recursos].y + 100, a.recursos.felicidad,config.fontColor); 
    b[4] = a.add.text(d[c.proxAtaque].x + 50,d[c.proxAtaque].y + 50, a.proxAtaque,config.fontColor); 
    b[5] = a.add.text(d[c.desplegable].x, d[c.desplegable].y + 50,"CLICK PARA\n CONSTRUIR",config.fontColor);

    //Profundidad del texto
    for(let i = 0;i<config.numHUDTexts;i++) {
      b[i].setDepth(config.hudDepth+1); b[i].setScrollFactor(0);
    }
  }
  initArrayPosiciones(){
    let x = 0; let offSet = 150;
    for(let i = 0;i<config.numHUDSprites-1;i++){
      this.posiciones[i] = new Vector2D(this.game.getxSize()/this.horizontalInterfaz-x, this.alturaInterfaz);
      x+=offSet;
    }
    this.posiciones[this.namesEnum.construccion] = new Vector2D(this.posiciones[this.namesEnum.desplegable].x, this.alturaInterfaz-offSet)
  }
  clickEnAjustes(ajustesSprite){
    ajustesSprite.on('pointerdown', pointer => {
      this.game.scene.switch('settings');
      this.game.pauseGame();
    })
  }
  clickEnDesplegable(desplegableSprite){
    desplegableSprite.on('pointerdown', pointer => {
      this.sprites[this.namesEnum.construccion].setVisible(!this.sprites[this.namesEnum.construccion].visible);
    })
  }
}
