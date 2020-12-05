import * as config from "./Config.js";
import Vector2D from "./Vector2D.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {   
        super(scene, casilla.x + config.sizeCasilla/2, casilla.y + config.sizeCasilla/1.25, 'jugador');
        this.casilla;
        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1,0.75);
        this.setDepth(1);
        scene.add.existing(this);
        //this.game = scene;
    }
    
    /*preUpdate(t,dt){
        super.preUpdate(t,dt);
    }*/


    move(pos,casilla){
        this.casilla = casilla;
        this.x= pos.x;
        this.y = pos.y;
      }

    Construir(edificio, pos, tamanyo){
        
    };
}