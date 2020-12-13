import * as config from "./config.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays y enums con la informacion
    this.names = { ajustes: 0, desplegable: 1, hudGeneral: 2, infoAldeanos: 3, construir: 4, menuDesp: 5, info: 6, flechaAb: 7,
    botonConstruir: 8, flechaAr: 9};
    this.tnames = { oro: 0, comida : 1, materiales: 2, felicidad: 3, proxAtaque: 4};
    this.inDesp = 3;

    this.sprites = new Array(config.hudSprites);

    this.texts = new Array(config.nuTexts);
    this.nombres = new Array(config.hudSprites);
    this.posiciones = new Array(config.hudSprites);

    this.creaInterfaz();
  }
  creaInterfaz(){
    this.intiNames();

    for(let i = 0; i< config.hudSprites; i++){
      this.sprites[i] = this.game.creaSprite(0, 0, this.nombres[i], this.game, config.hudDepth+1);
      this.sprites[i].setScale(this.sprites[i].scaleX/config.hudScale ,this.sprites[i].scaleY/config.hudScale);
      this.sprites[i].setOrigin(0.5,0.5);   this.sprites[i].setScrollFactor(0);
    }
    this.setPos(); this.creaTexts(); this.setTextsPos();
    this.visibilidad();
    this.inputs();
  }

  intiNames(){
    this.nombres[this.names.ajustes] = 'ajustes'; this.nombres[this.names.desplegable] = 'desplegable'; 
    this.nombres[this.names.hudGeneral] = 'hud'; this.nombres[this.names.infoAldeanos] = 'infoAldeanos';
    this.nombres[this.names.construir] = 'construir'; this.nombres[this.names.menuDesp] = 'menuDesplegable';
    this.nombres[this.names.info] = 'info'; this.nombres[this.names.flechaAb] = 'flecha';
    this.nombres[this.names.botonConstruir] = 'botonConstruir'; this.nombres[this.names.flechaAr] = 'flecha';
  }

  //TEXTOS DE LA INTERFAZ (PENSAR ALGO PARA LOS NUMEROS SUELTOS)
  creaTexts(){
    let a = this.tnames; 

    this.texts[a.oro] = this.game.add.text(0, 0, this.game.recursos.oro, this.game);
    this.texts[a.comida] = this.game.add.text(0, 0, this.game.recursos.comida, this.game);
    this.texts[a.materiales] = this.game.add.text(0, 0, this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = this.game.add.text(0, 0, this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = this.game.add.text(0, 0, this.game.proxAtaque, this.game);

    for(let i of this.texts){
      i.setOrigin(0.5,0.5);
      i.setFont(config.font);
      i.setStroke(config.stroke, 5);
      i.setFill(config.fillColor);
      i.setFontSize(config.fontSize);
      i.setScrollFactor(0);
      i.setDepth(config.hudDepth+1);
    }
    this.texts[a.proxAtaque].setFontSize(config.fontSize+40);
  }
  setTextsPos(){
    let a = this.tnames; let nE = this.names; let pI = this.sprites[nE.hudGeneral];
    let xOS = 20; let yOS = 10;

    this.sp(this.texts[a.proxAtaque], this.game.xSize/2+xOS, pI.y+yOS);
    this.sp(this.texts[a.oro],pI.x-pI.width/4+xOS, pI.y+pI.height/5);
    this.sp(this.texts[a.comida], pI.x-pI.width/6+xOS, pI.y+pI.height/5);
    this.sp(this.texts[a.materiales], pI.x-pI.width/4+xOS, pI.y-yOS);
    this.sp(this.texts[a.felicidad], pI.x-pI.width/6+xOS, pI.y-yOS);
  }

  setPos(){  //TODAS LAS POSICIONES DEPENDEN DE LA INTERFAZ
    let nE = this.names; let xoffSet = 172; let yOffSet = 20;

    this.sp(this.sprites[nE.hudGeneral],this.game.xSize/2,this.game.ySize-this.sprites[nE.hudGeneral].height/3);
    let pI = this.sprites[nE.hudGeneral];
    this.sp(this.sprites[nE.desplegable], pI.x+xoffSet, pI.y+yOffSet);
    this.sp(this.sprites[nE.ajustes],pI.x+xoffSet*1.77, pI.y+yOffSet);
    this.sp(this.sprites[nE.menuDesp],pI.x+xoffSet,pI.y-this.sprites[nE.menuDesp].height/2+yOffSet);
    this.sp(this.sprites[nE.info],pI.x+xoffSet, pI.y-pI.height/2);
    this.sp(this.sprites[nE.botonConstruir],pI.x+xoffSet, pI.y-pI.height);
    this.sp(this.sprites[nE.infoAldeanos], pI.x+xoffSet*2.4, pI.y-pI.height/2.1);
    this.sp(this.sprites[nE.construir], pI.x+xoffSet*1.93,pI.y-pI.height);
    this.sp(this.sprites[nE.flechaAb], pI.x+xoffSet*1.93,pI.y-pI.height/2+yOffSet);
    this.sp(this.sprites[nE.flechaAr], pI.x+xoffSet*1.93,pI.y-pI.height-this.sprites[nE.flechaAr].height-yOffSet);
  }
  sp(sprite,x,y){
    sprite.setPosition(x,y);
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
      if(!this.sprites[this.names.menuDesp].visible){
        this.sprites[this.names.menuDesp].setVisible(true);
        this.sprites[this.names.info].setVisible(true);
        this.sprites[this.names.botonConstruir].setVisible(true);
      }
      else{
        for(let a = this.inDesp; a<config.hudSprites; a++){
          this.sprites[a].setVisible(false);
        }
      }
    })
  }
  clickEnInfo(infoAl){
    infoAl.on('pointerdown', pointer => {
      this.sprites[this.names.infoAldeanos].setVisible(!this.sprites[this.names.infoAldeanos].visible);
      this.sprites[this.names.construir].setVisible(false);
      this.sprites[this.names.flechaAb].setVisible(false);
      this.sprites[this.names.flechaAr].setVisible(false);
    })
  }
  clickEnConstruccion(construccion){
    construccion.on('pointerdown', pointer =>{
      this.sprites[this.names.construir].setVisible(!this.sprites[this.names.construir].visible);
      this.sprites[this.names.flechaAb].setVisible(!this.sprites[this.names.flechaAb].visible);
      this.sprites[this.names.flechaAr].setVisible(!this.sprites[this.names.flechaAr].visible);
      this.sprites[this.names.infoAldeanos].setVisible(false);
    })
  }
  clickFlechaArriba(flechaAr){
    flechaAr.on('pointerdown', pointer =>{
      console.log("ARRIBA");
    })
  }
  clickFlechaAbajo(flechaAb){
    flechaAb.on('pointerdown', pointer =>{
      console.log("ABAJO");
    })
  }

  //ACTUALIZAR TEXTOS
  actualizaOro(oro){
    this.texts[this.tnames.oro].text = oro;
  }
  actualizaComida(comida){
    this.texts[this.tnames.comida].text = comida;
  }
  actualizaMateriales(materiales){
    this.texts[this.tnames.materiales].text = materiales;
  }
  actualizaFelicidad(felicidad){
    this.texts[this.tnames.felicidad].text = felicidad;
  }
  actualizaProxAtaque(pA){
    this.texts[this.tnames.proxAtaque].text = pA;
  }

  inputs(){
    //Inputs (implementar con callbacks)
    this.clickEnAjustes(this.sprites[this.names.ajustes]);
    this.clickEnDesplegable(this.sprites[this.names.desplegable]);
    this.clickEnInfo(this.sprites[this.names.info]);
    this.clickEnConstruccion(this.sprites[this.names.botonConstruir]);
    this.clickFlechaAbajo(this.sprites[this.names.flechaAb]);
    this.clickFlechaArriba(this.sprites[this.names.flechaAr]);
  }
  visibilidad(){
    //Sprites del desplgable comienzan no visibles
    for(let a = this.inDesp; a<config.hudSprites; a++){
      this.sprites[a].setVisible(false);
    }
    //Flip de un sprite y depth del sprite de la interfaz para colocarse por debajo de los demas
    this.sprites[this.names.flechaAr].setFlip(false,true);
    this.sprites[this.names.hudGeneral].setDepth(config.hudDepth);
  }

}