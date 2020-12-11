import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays y enums con la informacion
    this.namesEnum = { ajustes: 0, desplegable: 1, hudGeneral: 2, infoAldeanos: 3, construir: 4, menuDesp: 5, info: 6};
    this.textsEnum = { oro: 0, comida : 1, materiales: 2, felicidad: 3, proxAtaque: 4};
    this.sprites = new Array(config.numHUDSprites);
    this.texts = new Array(config.numHUDTexts);
    this.nombres = new Array(config.numHUDSprites);
    this.posiciones = new Array(config.numHUDSprites);

    this.creaInterfaz();
  }
  creaInterfaz(){
    this.initArrayNombres(); this.initArrayPosiciones(); this.initArrayTexts(); //inicia los arrays de informacion

    for(let i = 0;i<config.numHUDSprites;i++){
      this.sprites[i] = this.game.creaSprite(this.posiciones[i].x, this.posiciones[i].y, this.nombres[i], this.game, config.hudDepth+1);
      this.sprites[i].setScale(this.sprites[i].scaleX/1.5 ,this.sprites[i].scaleY/1.5);
      this.sprites[i].setScrollFactor(0);
    }
    //Sprite comienza no visibles
    this.sprites[this.namesEnum.info].setVisible(false);
    this.sprites[this.namesEnum.menuDesp].setVisible(false);
    this.sprites[this.namesEnum.infoAldeanos].setVisible(false);
    this.sprites[this.namesEnum.construir].setVisible(false);

    this.sprites[this.namesEnum.hudGeneral].setDepth(config.hudDepth);

    //Inputs (implementar con callbacks)
    this.clickEnAjustes(this.sprites[this.namesEnum.ajustes]);
    this.clickEnDesplegable(this.sprites[this.namesEnum.desplegable]);
    this.clickEnInfo(this.sprites[this.namesEnum.info]);
  }

  //ARRAYS CON LA INFORMACION
  //NOMBRES DE LOS SPRITES
  initArrayNombres(){
    this.nombres[this.namesEnum.ajustes] = 'ajustes'; this.nombres[this.namesEnum.desplegable] = 'desplegable'; 
    this.nombres[this.namesEnum.hudGeneral] = 'hud'; this.nombres[this.namesEnum.infoAldeanos] = 'infoAldeanos';
    this.nombres[this.namesEnum.construir] = 'construir'; this.nombres[this.namesEnum.menuDesp] = 'menuDesplegable';
    this.nombres[this.namesEnum.info] = 'info';
  }

  //TEXTOS DE LA INTERFAZ (PENSAR ALGO PARA LOS NUMEROS SUELTOS)
  initArrayTexts(){
    let posRec = this.posiciones[this.namesEnum.hudGeneral];
    let a = this.textsEnum; let OffSet = 110;

    this.texts[a.oro] = this.game.add.text(posRec.x+OffSet, posRec.y+OffSet, this.game.recursos.oro, this.game);
    this.texts[a.comida] = this.game.add.text(posRec.x+OffSet+100, posRec.y+OffSet, this.game.recursos.comida, this.game);
    this.texts[a.materiales] = this.game.add.text(posRec.x+OffSet, posRec.y+50, this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = this.game.add.text(posRec.x+OffSet+100, posRec.y+50, this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = this.game.add.text(this.game.xSize/2, posRec.y+50, this.game.proxAtaque, this.game);

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

  //(PENSAR ALGO PARA LOS NUMEROS SUELTOS)
  initArrayPosiciones(){ 
    let yOffSet = 30; let xOffSet = 126; let nE = this.namesEnum;
    this.posiciones[nE.ajustes] = new Vector2D(this.game.xSize/2+xOffSet*2+30,config.alturaHUD+yOffSet+20);
    this.posiciones[nE.desplegable] = new Vector2D(this.game.xSize/2+xOffSet,config.alturaHUD+yOffSet);
    this.posiciones[nE.hudGeneral] = new Vector2D(this.game.xSize/4.5,config.alturaHUD);

    //Desplegable
    this.posiciones[nE.infoAldeanos] = new Vector2D(this.game.xSize/1.4-11,config.alturaHUD-100);
    this.posiciones[nE.construir] = new Vector2D(this.game.xSize/2, config.alturaHUD-200);
    this.posiciones[nE.info] = new Vector2D(this.posiciones[nE.desplegable].x+25, this.posiciones[nE.desplegable].y-105);
    this.posiciones[nE.menuDesp] = new Vector2D(this.posiciones[nE.desplegable].x-23, this.posiciones[nE.desplegable].y-247);

  }

  //INPUT SOBRE LOS SPRITES (MIRAR CALLBACKS)
  clickEnAjustes(ajustesSprite){
    ajustesSprite.on('pointerdown', pointer => {
      this.game.scene.switch('settings');
      this.game.pauseGame();
    })
  }
  clickEnDesplegable(desplegableSprite){
    desplegableSprite.on('pointerdown', pointer => {
      if(!this.sprites[this.namesEnum.menuDesp].visible){
        console.log('Hola');
        this.sprites[this.namesEnum.menuDesp].setVisible(true);
        this.sprites[this.namesEnum.info].setVisible(true);
      }
      else{
        this.sprites[this.namesEnum.menuDesp].setVisible(false);
        this.sprites[this.namesEnum.info].setVisible(false);
        this.sprites[this.namesEnum.infoAldeanos].setVisible(false);
      }
    })
  }
  clickEnInfo(infoAl){
    infoAl.on('pointerdown', pointer => {
      this.sprites[this.namesEnum.infoAldeanos].setVisible(!this.sprites[this.namesEnum.infoAldeanos].visible);
    })
  }

  //ACTUALIZAR TEXTOS
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