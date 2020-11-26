import Vector2D from "./Vector2D.js";

export default class Cell extends Phaser.GameObjects.Sprite {

    constructor(scene, xpos, ypos, sizeCasilla) {
        let x = xpos;
        let y = ypos;
        let size = sizeCasilla;
        let position = new Vector2D(x, y, size);
        let estaOcupado = false;

        super(scene, position.x, position.y, 'ground');

        this.setOrigin(0, 0);
        this.setInteractive();
        scene.add.existing(this);
    }
    pos() {
        return this.position;
    }

}