export default class Mapa{
    constructor(scene, x,y){
        let jugador;
        let mapa = new Array(x);
        for(let i = 0;i<mapa.length;i++){
            mapa[i] = new Array(y);
        }
        this.construyeMatriz(scene, x,y, mapa);
    }
    construyeMatriz(scene, x,y, mapa){
        for(let c = 0; c < x ;c++){
            for(let j = 0; j < y;j++){
                mapa[j][c] = new Phaser.GameObjects.Sprite(scene,c*80, j*52,'cesped');

                //Configuracion del sprite
                mapa[j][c].setOrigin(0,0);
                mapa[j][c].setInteractive();
                this.inputOnSprite( mapa[j][c],j,c);

                //Se añade a la escena
                scene.add.existing(mapa[j][c]);
            }
        }
    }
    inputOnSprite(sprite, j,c){
        sprite.on('pointerdown', pointer =>{
            console.log('x:'+j+' y:'+c);
            this.jugador.MoveToPosition(c*80,j*50);
        })
    }
    setJugador(jug){
        this.jugador = jug;
    }
}