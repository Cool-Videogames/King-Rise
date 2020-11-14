export default class MovingFavicon extends Phaser.GameObjects.Sprite{
constructor(scene, spritename){
    let x = 0;
    let y = 400;
    super(scene,x,y,spritename);
    this.add.existing(this);
}
preUpdate(){
    super.preUpdate();
    this.x += 2;
    if(this.x > 1400) this.x = 0;
  }
}