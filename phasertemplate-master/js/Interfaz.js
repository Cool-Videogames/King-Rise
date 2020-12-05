import Game from "./game.js";
import Vector2D from "./vector2D.js";

export default class Interfaz {
   /*constructor() {
      super({ key: "interfaz" });
    }

    create(){
      this.SetPosiciones();

      this.ajustes = Game.global.creaSprite(this.ajustesPosition.x,this.ajustesPosition.y,'ajustes', this);
      this.recursos = Game.global.creaSprite(this.recursosPosition.x,this.recursosPosition.y,'recursos', this);
      this.proxAtaque = Game.global.creaSprite(this.proxAtaquePosition.x,this.proxAtaquePosition.y,'proxAtaque', this);
      this.desplegable = Game.global.creaSprite(this.desplegablePosition.x,this.desplegablePosition.y,'desplegable', this);

      this.clickEnAjustes(this.ajustes);
      this.clickEnDesplegable(this.desplegable);

      this.SetTexts();
    }
    update(){
      
    }

    //FUNCIONALIDAD

    SetTexts(){
      this.oroText = this.add.text(this.recursosPosition.x, this.recursosPosition.y,Game.global.recursos.oro,{fontColor: 0xffff00})
      this.materialesText = this.add.text(this.recursosPosition.x+50, this.recursosPosition.y,Game.global.recursos.materiales,{fontColor: 0xffff00})
      this.comidaText = this.add.text(this.recursosPosition.x, this.recursosPosition.y+50,Game.global.recursos.comida,{fontColor: 0xffff00})
      this.felicidadText = this.add.text(this.recursosPosition.x+50, this.recursosPosition.y+50,Game.global.recursos.felicidad,{fontColor: 0xffff00})

      this.proxAtaqueText = this.add.text(this.proxAtaquePosition.x+50, this.proxAtaquePosition.y+50,Game.global.proximoAtaque,{fontColor: 0xffff00})
    }
    SetPosiciones(){
      this.ajustesPosition = new Vector2D(850,600);
      this.recursosPosition = new Vector2D(400,600);
      this.proxAtaquePosition = new Vector2D(550, 600);
      this.desplegablePosition = new Vector2D(700,600);
    }
    ActualizaRecursos(oro, comida, materiales, felicidad){
      this.oroText.text = oro;
      this.comidaText.text = comida;
      this.materialesText.text = materiales;
      this.felicidadText.text = felicidad;
    }
    ActualizaOro(oro){
      this.oroText.text = oro;
    }
    ActualizaComida(comida){
      this.comidaText.text = comida;
    }
    ActualizaMateriales(materiales){
      this.materialesText.text = materiales;
    }
    ActualizaFelicidad(felicidad){
      this.felicidadText.text = felicidad;
    }
  
    clickEnAjustes(ajustesSprite){
      ajustesSprite.on('pointerdown', pointer => {
        this.scene.switch('settings');
        this.scene.sleep('main'); //Pensar en algo para no dormir la escena, simplemente no recibir input en ella
      })
    }
    clickEnDesplegable(desplegableSprite){
      desplegableSprite.on('pointerdown', pointer => {
        //funcionalidad del desplegable
      })
    }*/
}