export default class  MovingFavicon extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = 100;
        let y = 100;
        super(scene,x,y,'favicon');
        scene.add.existing(this);
    }
    MoveToPosition(x,y){
        this.x = x;
        this.y = y;
        console.log(this.x+' '+this.y);
    }
}