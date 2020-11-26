import Vector2D from "./Vector2D.js";

export default class Cell extends Phaser.GameObjects.Sprite{
    constructor(scene, _x, _y, cellSize) {
        let x = _x;
        let y = _y;
        let position = new Vector2D(x,y, cellSize);
        let estaOcupado = false;

        super(scene, position.x,position.y,'ground');

        this.setOrigin(0,0);
        this.setInteractive();
        scene.add.existing(this);

    }
}