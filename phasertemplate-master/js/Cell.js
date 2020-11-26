import Vector2D from "./Vector2D.js";

export default class Cell extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x,y,'ground');
        this.x = x;
        this.y = y;
        this.position = new Vector2D(x,y);

        this.setOrigin(0,0);
        this.setInteractive();
        scene.add.existing(this);

        this.estaOcupado = false;
    }
}