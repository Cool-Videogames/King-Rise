import Edificio from "./edificio.js";

export default class EdificioSocial extends Edificio{
    constructor(scene,vida,coste,posicion,ancho,alto,felicidad, key){
        super(scene,vida,coste,posicion,ancho,alto, key);
        this.cantidad= felicidad;
        this.game = scene;

        scene.physics.add.existing(this);
        scene.physics.arcade.moveToPointer(this, 400);
    
    //ESTO SE CAMBIARA DE TIEMPO A ACCIONES CUANDO ESTÉ IMPLEMENTADO
        this.timer = 5000;
    }
    
    preUpdate(t,dt){
        this.timer -= dt;
        if(this.timer <= 0){
            this.generar();
            this.timer = 5000;
        }
    
        super.preUpdate(t,dt);
    }
    
    generar(){
        this.game.recursos.felicidad += this.cantidad;
    }

    asignarAldeanos(aldeanos){
        this.numAldeanos++;
    }
}
