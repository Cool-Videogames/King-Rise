export default class Mapa{
    constructor(scene, size, favicon){
        let mapa = new Array(size);
        for(let i = 0;i<mapa.length;i++){
            mapa[i] = new Array(size);
        }
        this.construyeMatriz(scene, size, mapa, favicon);
    }
    construyeMatriz(scene, size, mapa, favicon){
        let indice = 0;
        for(let c = 0; c < size ;c++){
            for(let j = 0; j < size;j++){
                mapa[j][c] = new Phaser.GameObjects.Sprite(scene,(c*80), (j*20),'cesped');
                if(indice % 2 != 0) mapa[j][c] = new Phaser.GameObjects.Sprite(scene,(c*80)-40, (j*20),'cesped');

                mapa[j][c].setOrigin(0,0);
                mapa[j][c].setInteractive();
                this.inputOnSprite( mapa[j][c],j,c,favicon);

                indice++;
                scene.add.existing(mapa[j][c]);
            }
        }
    }
    inputOnSprite(sprite, j,c,favicon){
        sprite.on('pointerdown', pointer =>{
            console.log('x:'+j+' y:'+c);
            let posx = c*75+30; let posy = j*40;
            favicon.MoveToPosition(posx,posy);
        })
    }
}