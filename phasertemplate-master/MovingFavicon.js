export default class  MovingFavicon extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = 600;
        let y = 400;
        super(scene,x,y,'favicon');
        scene.add.existing(this);
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        this.x +=2;
        if(this.x > 1400) this.x = 0;
    }
}