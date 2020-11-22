export default class Mapa {
    constructor(scene, size){
        let mapa = new Array(size);
        for(let i = 0;i<mapa.length;i++){
            mapa[i] = new Array(size);
        }
        for(let c = 0; c < size ;c++){
            for(let j = 0; j < size;j++){
                mapa[c][j] = new Phaser.GameObjects.Sprite(scene,c*80, j*50,'cesped');
                mapa[c][j].setOrigin(0,0);
                //mapa[c][j] = new Phaser.GameObjects.Sprite(scene,(c*80)/2, (j*50)/2,'cesped');
                scene.add.existing(mapa[c][j]);
            }
        }
    }
}