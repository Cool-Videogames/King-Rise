export default class AudioManager {
    constructor(scene){
        this.game = scene;

        this.mainSound = this.game.sound.add('music');
        this.construccion = this.game.sound.add("construccion",{volume:0.7});
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
        this.mainSound.play(this.musicConfig);
    }
    setVolumen(vol){
        this.mainSound.setVolume(vol);
    }
}