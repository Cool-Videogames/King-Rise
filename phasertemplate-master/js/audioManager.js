export default class AudioManager{
    constructor(scene){
        this.game = scene;

        this.mainSound = this.game.sound.add('music');
        this.startMusic();
    }
    startMusic(){
        let musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }
        this.mainSound.play(musicConfig);
    }
}