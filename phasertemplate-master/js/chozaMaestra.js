import Edificio from "./edificio.js";
import * as config from "./config.js"
import Vector2D from "./vector2D.js";

export default class ChozaMaestra extends Edificio{
    constructor(scene,vida,coste,posicion, key){
        super(scene, vida, coste, posicion, key);

        this.game = scene;
        this.setOrigin(0,0);
        this.setInteractive();

        this.opEnum = { mineros: 0, ganaderos: 1, canteros: 2, exploradores: 3};
        this.opNames = new Array(config.numEspecialidades);
        this.initNamesArray();
        this.ops = new Array(config.numEspecialidades);

        //MARCO DEL MENU
        this.posicionMarco = new Vector2D(this.posicion.x+config.sizeCasilla*3, this.posicion.y+config.sizeCasilla);
        this.marco = this.game.creaSprite(this.posicionMarco.x,this.posicionMarco.y, 'marco',this.game, config.playerDepth);
        this.marco.setVisible(false);

        this.text = this.game.add.text(this.posicionMarco.x+50, this.posicionMarco.y, "PRUEBA CLICK EN TEXTO", config.fontColor);
        this.text.setDepth(config.hudDepth+1);
        this.text.setInteractive();

        //OPCIONES DE ESPECIALIZACION
        let y = 10; let offSet = 10;
        for(let i = 0;i<this.ops.length;i++){
            this.ops[i] = this.game.creaSprite(this.posicionMarco.x, this.posicionMarco.y+y, this.opNames[i], this.game, config.playerDepth);
            this.ops[i].setVisible(false);
            y += offSet;
        }
        this.clickEnChoza(this);
        this.clickEnTexto(this.text);
        
    }
    initNamesArray(){
        this.opNames[0] = 'opMineros';
        this.opNames[1] = 'opGanaderos';
        this.opNames[2] = 'opCanteros';
        this.opNames[3] = 'opExploradores'
    }
    clickEnChoza(chozaSprite){
        chozaSprite.on('pointerdown', pointer => {
            this.muestraOpciones();
        })
      }
    clickEnTexto(texto){
        texto.on('pointerup', pointer => {
            console.log("CLICK EN TEXTO");
        })
    }
    muestraOpciones(){
        this.marco.setVisible(!this.marco.visible);
        for(let i of this.ops) i.setVisible(!i.visible);
    }
    especializar(aldeanos, espec){
        aldeanos.Especializarse(espec);
    }
}
