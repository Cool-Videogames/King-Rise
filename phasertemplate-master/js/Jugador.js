export default class Jugador extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = 0;
        let y = 0;
        super(scene, x,y,'jugador');
        this.setOrigin(0,0);
        scene.add.existing(this);
    }
    preUpdate(t,dt){
        super.preUpdate(t,dt);
    }
    MoveToPosition(x,y){
        this.x = x;
        this.y = y;
    }
}