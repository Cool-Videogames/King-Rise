export default class  MovingFavicon extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = 200;
        let y = 100;
        super(scene,x,y,'favicon');
        scene.add.existing(this);
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        this.x +=2;
        if(this.x > 930) this.y+= 5;
    }
    MoveToPosition(x,y){
        if(this.x < x) this.x += 2;
        if(this.y < y) this.y += 2;
    }
}