export default class Mapa {
    constructor(scene, size){
        let mapa = new Array(size);
        for(let i = 0;i<mapa.length;i++){
            mapa[i] = new Array(size);
        }

        let indice = 0;
        for(let c = 0; c < size ;c++){
            for(let j = 0; j < size;j++){
                mapa[j][c] = new Phaser.GameObjects.Sprite(scene,(c*80), (j*20),'cesped');
                if(indice % 2 != 0) mapa[j][c] = new Phaser.GameObjects.Sprite(scene,(c*80)-40, (j*20),'cesped');
                mapa[j][c].setOrigin(0,0);
                indice++;
                scene.add.existing(mapa[j][c]);
            }
        }
    }
}