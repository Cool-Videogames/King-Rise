export default class  MovingFavicon extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = 400;
        let y = 110;
        super(scene,x,y,'favicon');
        scene.add.existing(this);
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        if(this.x > 935) {
            this.y+= 5;
            this.x+=1;
        }
        else this.x +=2;
    }
    MoveToPosition(x,y){
        if(this.x < x) this.x += 2;
        if(this.y < y) this.y += 2;
    }
}