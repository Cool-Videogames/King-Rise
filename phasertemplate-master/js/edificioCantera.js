import EdificioRecursos from "./edificioRecursos.js";

export default class EdificioCantera extends EdificioRecursos{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
        super(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key);
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
        this.game.recursos.materiales += this.cantidad + this.rendimientoAldeanos;
    }
    asignar(){
        super.asignar();
        rend += aldeanos.rendimiento.rendMateriales;
    }
    //MENU PARA ASIGNAR ALDEANOS
}