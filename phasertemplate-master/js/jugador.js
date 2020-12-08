import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {   
        let offSetX = config.sizeCasilla /2;
        let offSetY =config.sizeCasilla/1.25;
        let iniCasilla =scene.mapa.mapa[casilla.x][casilla.y];
        super(scene, iniCasilla.x + offSetX ,iniCasilla.y +offSetY, 'jugador');
        this.casilla = iniCasilla;
        this.casilla.setOcupada(true);
        this.speed= config.playerSpeed;

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isMoving = false;
        this.target = iniCasilla;
        this.dir = 'none';

        this.nodoDestino = null;
    }
    preUpdate(t,dt){
        this.compruebaPosicion();
        super.preUpdate(t,dt);
    }
    
    compruebaPosicion(){
      if(this.x > this.target.x-1 && this.x < this.target.x+1 &&this.y > this.target.y-1 && this.y < this.target.y+1){
          this.body.reset(this.target.x,this.target.y);
          this.isMoving=false;

          if(this.nodoDestino != null && this.nodoDestino.siguiente != null){
              this.movimientoCasillas(this.nodoDestino.siguiente);
          }
      }
    }

    move(pos,casilla){
        this.casilla = casilla;
        this.target = pos;

        //if(this.dir !=='none'){
            this.isMoving=true;
            this.game.physics.moveTo(this,pos.x,pos.y,this.speed);
        //}
      }

    desfasePosicion(cell){ //Devuelve un vector2 con la posicion centrada del jugador
        return new Vector2D(cell.x + config.sizeCasilla / 2,
            cell.y + config.sizeCasilla/1.25);
    }
    
    movimientoCasillas(siguienteNodo){
        this.nodoDestino = siguienteNodo;
        this.target = this.desfasePosicion(this.nodoDestino.cellAct);
        this.casilla = this.nodoDestino.cellAct;
        this.isMoving = true;
        this.game.physics.moveTo(this,this.target.x,this.target.y,this.speed);
    }
    Construir(edificio, pos, tamanyo){
    };
}
