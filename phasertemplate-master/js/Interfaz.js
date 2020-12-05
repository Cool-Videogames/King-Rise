import * as config from "./Config.js";
import Vector2D from "./Vector2D.js";

export default class Interfaz extends Phaser.GameObjects.Sprite{
  constructor(scene){
    super(scene, 'interfaz');
    this.game = scene;

    this.create();
  }
  create(){
    this.SetPosiciones();

    this.ajustes = this.game.creaSprite(this.ajPos.x, this.ajPos.y, 'ajustes', this.game);
    this.recursos = this.game.creaSprite(this.recPos.x, this.recPos.y, 'recursos', this.game);
    this.proxAtaque = this.game.creaSprite(this.pAPos.x, this.pAPos.y, 'proxAtaque', this.game);
    this.desplegable = this.game.creaSprite(this.desPos.x, this.desPos.y, 'desplegable', this.game);
    this.construccion = this.game.creaSprite(this.consPos.x, this.consPos.y, 'construccion', this.game);

    this.construccion.setVisible(false);
    this.clickEnAjustes(this.ajustes);
    this.clickEnDesplegable(this.desplegable);

    this.SetTexts();
  }
  SetTexts(){
    //TEXTO PARA INDICAR LOS RECURSOS (NUMEROS PROVISIONALES)
    this.oroText = this.game.add.text(this.recPos.x+50, this.recPos.y,this.game.recursos.oro,config.fontColor);
    this.comText = this.game.add.text(this.recPos.x+100, this.recPos.y,this.game.recursos.comida,config.fontColor);
    this.matText = this.game.add.text(this.recPos.x+50, this.recPos.y+100,this.game.recursos.materiales,config.fontColor);
    this.felText = this.game.add.text(this.recPos.x+100, this.recPos.y+100,this.game.recursos.felicidad,config.fontColor);

    //TEXTO PARA INDICAR EL PROXIMO ATAQUE
    this.proxAtaqueText = this.game.add.text(this.pAPos.x+50, this.pAPos.y+50,this.game.proxAtaque,config.fontColor);

    //TEXTO PARA EL DESPLEGABLE
    this.desplegableText = this.game.add.text(this.desPos.x, this.desPos.y+50,"CLICK PARA\n CONSTRUIR",config.fontColor);
  }
  SetPosiciones(){
    //(NUMEROS PROVISIONALES)
    this.ajPos = new Vector2D(200,200);
    this.desPos = new Vector2D(50,200);
    this.pAPos = new Vector2D(-100, 200);
    this.recPos = new Vector2D(-250,200);
    this.consPos = new Vector2D(50,50);
  }

  clickEnAjustes(ajustesSprite){
    ajustesSprite.on('pointerdown', pointer => {
      this.game.scene.switch('settings');
    })
  }
  clickEnDesplegable(desplegableSprite){
    desplegableSprite.on('pointerdown', pointer => {
      this.construccion.setVisible(!this.construccion.visible);
    })
  }
}
