import Vector2D from "./Vector2D.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, mapa) {
        let x2 = Math.random() * mapa.x;
        x2 = Math.round(x2);
        let y2 = Math.random() * mapa.y;
        y2 = Math.round(y2);

        let pos = mapa.mapa[x2][y2].position;
        super(scene, pos.x, pos.y, 'jugador');

        this.position = pos;
        this.x1 = x2;
        this.y1 = y2;
        this.setOrigin(0.5, 1);
        scene.add.existing(this);

        
    }
    /*preUpdate(t,dt){
        super.preUpdate(t,dt);
    }*/


    MovePosition(v) {
        this.position = v;
        this.x = v.x;
        this.y = v.y;


        console.log(this.x);
        console.log(this.y);

    }
}