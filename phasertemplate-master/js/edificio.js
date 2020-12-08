import * as config from "./config.js"

export default class Edificio extends Phaser.GameObjects.Sprite{
    constructor(scene,vida,coste,posicion){
        let offSetX = config.sizeCasilla /2;
        let offSetY =config.sizeCasilla/1.25;
       
        super(scene, posicion.x + offSetX ,posicion.y + offSetY, 'edificio');
        this.vida= vida;
        this.coste= coste;
        this.posicion = posicion;

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
    }

    construir(){
        //recursos del jugador -= coste;
        //asignar posicion
    }

    destruir(){
        //recursos del jugador += coste * 0.75;
        this.mapa[this.posicion.y][this.posicion.x] = libre;
    }
}
