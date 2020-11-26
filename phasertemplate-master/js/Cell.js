import Vector2D from "./Vector2D.js";

export default class Cell {

    static size;
    constructor(scene, x, y, sizeCasilla) {
        //super(scene, x,y,'ground');

        this.x = x;
        this.y = y;
        this.size = sizeCasilla;

        this.sprite = new Phaser.GameObjects.Sprite(scene, 80, 52, 'ground');
        // this.setOrigin(0,0);
        scene.add.existing(this.sprite);

        // this.position = new Vector2D(x,y, size);

        // this.setInteractive();
        // this.estaOcupado = false;

    }

}