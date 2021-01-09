import EdificioRecursos from "./edificioRecursos.js";

export default class EdificioMina extends EdificioRecursos{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
        super(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key);
        this.game = scene;
        this.tipoAldeano = scene.mineros;
    }
    //TIMEPO -> CAMBIAR A ACCIONES
    preUpdate(t,dt){
        super.preUpdate(t,dt);
        this.timer -= dt;
        if(this.timer <= 0){
            this.generar();
            this.timer = 5000;
        }
    }
    generar(){
        this.game.recursos.oro += this.cantidad + this.rendimientoAldeanos;
        this.game.interfaz.actualizaInterfaz();
    }
    asignarAldeanos(){
        super.asignarAldeanos(); 
        rend += aldeanos.rendimiento.rendOro;
    }
}