import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays con la informacion
    this.namesEnum = { ajustes: 0, desplegable: 1, hudGeneral: 2};
    this.textsEnum = { oro: 0, comida : 1, materiales: 2, felicidad: 3, proxAtaque: 4};
    this.sprites = new Array(config.numHUDSprites);
    this.texts = new Array(config.numHUDTexts);
    this.nombres = new Array(config.numHUDSprites);
    this.posiciones = new Array(config.numHUDSprites);

    this.crea();
  }
  crea(){
    this.initArrayNombres(); this.initArrayPosiciones(); this.initArrayTexts(); //inicia los arrays de informacion

    for(let i = 0;i<config.numHUDSprites;i++){
      this.sprites[i] = this.game.creaSprite(this.posiciones[i].x, this.posiciones[i].y, this.nombres[i], this.game, config.hudDepth+1);
      this.sprites[i].setScale(this.sprites[i].scaleX/1.5 ,this.sprites[i].scaleY/1.5);
      this.sprites[i].setScrollFactor(0);
    }

    this.sprites[this.namesEnum.hudGeneral].setDepth(config.hudDepth);
    this.clickEnAjustes(this.sprites[this.namesEnum.ajustes]);
    this.clickEnDesplegable(this.sprites[this.namesEnum.desplegable]);
  }
  initArrayNombres(){
    this.nombres[this.namesEnum.ajustes] = 'ajustes'; this.nombres[this.namesEnum.desplegable] = 'desplegable'; 
    this.nombres[this.namesEnum.hudGeneral] = 'hud';
  }
  initArrayTexts(){
    let posRec = this.posiciones[this.namesEnum.hudGeneral];
    let a = this.textsEnum;

    this.texts[a.oro] = this.game.add.text(posRec.x+160,posRec.y+150,this.game.recursos.oro, this.game);
    this.texts[a.comida] = this.game.add.text(posRec.x+260,posRec.y+150,this.game.recursos.comida, this.game);
    this.texts[a.materiales] = this.game.add.text(posRec.x+160,posRec.y+85,this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = this.game.add.text(posRec.x+260,posRec.y+85,this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = this.game.add.text(posRec.x+440,posRec.y+110,this.game.proxAtaque, this.game);

    for(let i of this.texts){
      i.setFont('Arial Black');
      i.setStroke('#000000', 5);
      i.setFill('#F9B258');
      i.setFontSize(50);
      i.setScrollFactor(0);
      i.setDepth(config.hudDepth+1);
    }
  }
  initArrayPosiciones(){
    let yOffSet = 70; let xOffSet = 126;
    this.posiciones[this.namesEnum.ajustes] = new Vector2D(this.game.xSize/2+xOffSet*2,config.alturaHUD+yOffSet);
    this.posiciones[this.namesEnum.desplegable] = new Vector2D(this.game.xSize/2+xOffSet,config.alturaHUD+yOffSet);
    this.posiciones[this.namesEnum.hudGeneral] = new Vector2D(this.game.xSize/6,config.alturaHUD);
  }
  clickEnAjustes(ajustesSprite){
    ajustesSprite.on('pointerdown', pointer => {
      this.game.scene.switch('settings');
      this.game.pauseGame();
    })
  }
  clickEnDesplegable(desplegableSprite){
    desplegableSprite.on('pointerdown', pointer => {
      //this.sprites[this.namesEnum.construccion].setVisible(!this.sprites[this.namesEnum.construccion].visible);
    })
  }
  actualizaOro(oro){
    this.texts[this.textsEnum.oro].text = oro;
  }
  actualizaComida(comida){
    this.texts[this.textsEnum.comida].text = comida;
  }
  actualizaMateriales(materiales){
    this.texts[this.textsEnum.materiales].text = materiales;
  }
  actualizaFelicidad(felicidad){
    this.texts[this.textsEnum.felicidad].text = felicidad;
  }
  actualizaProxAtaque(pA){
    this.texts[this.textsEnum.proxAtaque].text = pA;
  }
}
