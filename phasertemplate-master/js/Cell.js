import Vector2D from "./Vector2D.js";

export default class Cell{
    constructor(scene, x, y,c,j) {
        this.x = x;
        this.y = y;
        
        this.ocupada = false;

        //Un sprite como atributo de la clase
        this.sprite = new Phaser.GameObjects.Sprite(scene, x,y,'sabana');;
        this.sprite.setOrigin(0,0);
        this.sprite.setInteractive();
        this.sprite.setDepth(0);
        scene.add.existing(this.sprite);
    }

    printCell(c,j){
        console.log('x:' + c + ' y:' + j+ '   Esta ocupada: ' + this.ocupada);
    }

    setOcupada(ocup){
        this.ocupada = ocup;
    }
}