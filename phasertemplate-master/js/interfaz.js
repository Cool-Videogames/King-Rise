import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays con la informacion
    this.namesEnum = { ajustes: 0, desplegable: 1, hudGeneral: 2, infoAldeanos: 3, construir: 4, menuDesp: 5};
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
    //this.sprites[this.namesEnum.infoAldeanos].setScale(this.sprites[this.namesEnum.infoAldeanos].scaleX/2,this.sprites[this.namesEnum.infoAldeanos].scaleY/2);

    this.sprites[this.namesEnum.hudGeneral].setDepth(config.hudDepth);
    this.clickEnAjustes(this.sprites[this.namesEnum.ajustes]);
    this.clickEnDesplegable(this.sprites[this.namesEnum.desplegable]);
  }
  //NOMBRES DE LOS SPRITES
  initArrayNombres(){
    this.nombres[this.namesEnum.ajustes] = 'ajustes'; this.nombres[this.namesEnum.desplegable] = 'desplegable'; 
    this.nombres[this.namesEnum.hudGeneral] = 'hud'; this.nombres[this.namesEnum.infoAldeanos] = 'infoAldeanos';
    this.nombres[this.namesEnum.construir] = 'construir'; this.nombres[this.namesEnum.menuDesp] = 'menuDesplegable';
  }

  //TEXTOS DE LA INTERFAZ
  initArrayTexts(){
    let posRec = this.posiciones[this.namesEnum.hudGeneral];
    let a = this.textsEnum;
    let xOffSet = 110;

    this.texts[a.oro] = this.game.add.text(posRec.x+xOffSet, posRec.y+110, this.game.recursos.oro, this.game);
    this.texts[a.comida] = this.game.add.text(posRec.x+xOffSet+100, posRec.y+110, this.game.recursos.comida, this.game);
    this.texts[a.materiales] = this.game.add.text(posRec.x+xOffSet, posRec.y+50, this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = this.game.add.text(posRec.x+xOffSet+100, posRec.y+50, this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = this.game.add.text(posRec.x+360, posRec.y+50, this.game.proxAtaque, this.game);

    for(let i of this.texts){
      i.setFont(config.font);
      i.setStroke(config.stroke, 5);
      i.setFill(config.fillColor);
      i.setFontSize(config.fontSize);
      i.setScrollFactor(0);
      i.setDepth(config.hudDepth+1);
    }
    this.texts[a.proxAtaque].setFontSize(config.fontSize+40);
  }
  initArrayPosiciones(){
    let yOffSet = 30; let xOffSet = 126;
    this.posiciones[this.namesEnum.ajustes] = new Vector2D(this.game.xSize/2+xOffSet*2+30,config.alturaHUD+yOffSet+20);
    this.posiciones[this.namesEnum.desplegable] = new Vector2D(this.game.xSize/2+xOffSet,config.alturaHUD+yOffSet);
    this.posiciones[this.namesEnum.hudGeneral] = new Vector2D(this.game.xSize/4.5,config.alturaHUD);
    //this.posiciones[this.namesEnum.infoAldeanos] = new Vector2D(this.game.xSize/1.4-17,config.alturaHUD-100);
    //this.posiciones[this.namesEnum.construir] = new Vector2D(this.game.xSize/2, config.alturaHUD-200);
    this.posiciones[this.namesEnum.infoAldeanos] = new Vector2D(0,0);
    this.posiciones[this.namesEnum.construir] = new Vector2D(0, 0);
    this.posiciones[this.namesEnum.menuDesp] = new Vector2D(this.game.xSize/1.8+27, config.alturaHUD-217);
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