import * as config from "./config.js"

export default class Cell{
    constructor(scene, x, y, indiceX, indiceY) {
        this.x = x;
        this.y = y;
        
        this.indiceX = indiceX;
        this.indiceY = indiceY;

        this.ocupada = false;

        //Un sprite como atributo de la clase
        this.sprite = new Phaser.GameObjects.Sprite(scene, x,y,'sabana');
        this.sprite.setScale(config.sizeCasilla/32,config.sizeCasilla/32);
        this.sprite.setOrigin(0,0);
        this.sprite.setInteractive();
        this.sprite.setDepth(config.mapDepth);
        scene.add.existing(this.sprite);


    }

    printCell(c,j){
        console.log('x:' + c + ' y:' + j+ '   Esta ocupada: ' + this.ocupada);
    }

    setOcupada(ocup){
        this.ocupada = ocup;
    }
}
