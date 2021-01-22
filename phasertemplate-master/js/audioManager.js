export default class AudioManager {
    constructor(scene){
        this.game = scene;

        this.mainSound = this.game.sound.add('music');
        this.construccion = this.game.sound.add("construccion",{volume:0.7});
        this.destruccion =  this.game.sound.add("destruccion",{volume:0.5});
        this.menuInicio = this.game.sound.add("menuInicio", {volume: 0.3});
        this.musicCombate = this.game.sound.add("cancionCombate", {volumen: 0.3});
        this.startMusic();
    }
    startMusic(){
        this.musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }
        /*this.game.sound.on('decoded', 'music', () =>{
            this.mainSound.play(this.musicConfig);
        });*/
        //this.mainSound.play(this.musicConfig);
    }
    setVolumen(vol){
        this.mainSound.setVolume(vol);
        this.construccion.setVolume(vol);
        this.destruccion.setVolume(vol);
    }

    stopAll(){
        this.mainSound.pause();
        this.construccion.pause();
        this.destruccion.pause();
    }
}