import * as config from "./config.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {   
        let offSetX = config.sizeCasilla /2;
        let offSetY =config.sizeCasilla/1.25;
        let iniCasilla =scene.mapa.mapa[casilla.x][casilla.y];
        super(scene, iniCasilla.x + offSetX ,iniCasilla.y +offSetY, 'jugador');
        this.casilla = iniCasilla;
        this.casilla.setOcupada(true);

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,0.75*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
        this.game = scene;
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