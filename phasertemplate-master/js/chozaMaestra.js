import Edificio from "./edificio.js";
import Game from "./game.js";
import * as config from "./config.js"

export default class ChozaMaestra extends Edificio{
    constructor(scene,vida,coste,posicion, key){
        super(scene, vida, coste, posicion, key);

        this.opEnum = { mineros: 0, ganaderos: 1, canteros: 2, exploradores: 3};
        this.opNames = new Array(config.numEspecialidades);
        this.ops = new Array(config.numEspecialidades);

        //Al heredar de edificio ya tiene todos los atributos del edificio
        this.destruible = false;
        this.setInteractive();
        this.initNamesArray();

        //Opciones
        let x = 50; let offSet = 150;
        for(let i = 0;i<this.ops.length;i++){
            this.ops[i] = scene.creaSprite(this.posicion.x+x, this.posicion.y, this.opNames[i], scene, config.playerDepth);
            this.ops[i].setVisible(false);
            x += offSet;
        }
        this.clickEnChoza(this);
        
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
    muestraOpciones(){
        for(let i of this.ops) i.setVisible(!i.visible);
    }
    especializar(aldeanos, espec){
        aldeanos.Especializarse(espec);
    }

    crearAldeano(){
        Game.aldeanos++;
    }
}
