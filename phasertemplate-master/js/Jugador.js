import Vector2D from "./Vector2D.js";

export default class Jugador extends Phaser.GameObjects.Sprite{
    constructor(scene, _x = 0, _y = 0){
        let x = _x;
        let y = _y;
        let position = new Vector2D(x,y);
        super(scene, position.x,position.y,'jugador');
        this.setOrigin(0,0);
        scene.add.existing(this);
    }
    /*preUpdate(t,dt){
        super.preUpdate(t,dt);
    }*/
    MoveToPosition(x,y){
        this.x = x;
        this.y = y;
    }
}