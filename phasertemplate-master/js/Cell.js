import Vector2D from "./Vector2D.js";

export default class Cell{
    constructor(scene, x, y) {
        this.x = x;
        this.y = y;
        this.position = new Vector2D(x,y);

        //Un sprite como atributo de la clase
        let spr = new Phaser.GameObjects.Sprite(scene, x,y,'ground');
        this.sprite = spr;
        this.sprite.setOrigin(0,0);
        this.sprite.setInteractive();
        scene.add.existing(this.sprite);
    }
}