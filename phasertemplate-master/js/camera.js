import * as config from "./config.js";

export default class Camera {
    constructor(scene,camera){
        this.camera = camera;

        this.camera.centerOn(scene.jug.x,scene.jug.y);

        this.cursors = scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            space:Phaser.Input.Keyboard.KeyCodes.SPACE});
            
        this.game =scene;
    }

    comportamientoCamara(){
        let camera =  this.camera;
    
        //Movimiento
        if (this.cursors.up.isDown && camera.scrollY > -config.cameraLimit){
          camera.scrollY -=  config.cameraSpeed;
        }
        if (this.cursors.down.isDown && camera.scrollY + camera.height  < config.sizeCasilla* config.filas +config.cameraLimit) {
          camera.scrollY += config.cameraSpeed;
        }
        if (this.cursors.left.isDown && camera.scrollX > -config.cameraLimit){
          camera.scrollX -= config.cameraSpeed;
    
        }
        if(this.cursors.right.isDown && camera.scrollX + camera.width  < config.sizeCasilla* config.columnas +config.cameraLimit){
          camera.scrollX += config.cameraSpeed;
        }
    
        //Reposicionamiento
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){;
          if(this.game.jug.y - camera.height/2 < -config.cameraLimit)
            camera.scrollY = -config.cameraLimit;
          else if(this.game.jug.y - camera.height/2 > config.sizeCasilla* config.filas + config.cameraLimit - camera.height)
            camera.scrollY = config.sizeCasilla* config.filas + config.cameraLimit - camera.height;
          else camera.scrollY = this.game.jug.y - camera.height/2
    
          if(this.game.jug.x - camera.width/2 < -config.cameraLimit) 
            camera.scrollX =  -config.cameraLimit;
          else if(this.game.jug.x - camera.width/2 >config.sizeCasilla* config.columnas+ config.cameraLimit - camera.width)
            camera.scrollX = config.sizeCasilla* config.columnas + config.cameraLimit - camera.width;
          else camera.scrollX = this.game.jug.x - camera.width/2
        }
      }
}