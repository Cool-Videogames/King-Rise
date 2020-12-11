import Edificio from "./edificio.js";
import * as config from "./config.js"

export default class EdificioRecursos extends Edificio{
    constructor(scene,vida,coste,posicion,aldeanosMax,especialidad, key){
    super(scene,vida,coste,posicion, key);
    this.aldeanosMax =aldeanosMax;
    this.numAldeanos= 0;
    this.rendimientoAldeanos = 0;
    this.especialidad = especialidad;
    this.cantidad= config.cantidadRecursosPorDefecto;
    this.game = scene;

    this.isBuilt = false;

    //ESTO SE CAMBIARA DE TIEMPO A ACCIONES CUANDO ESTÉ IMPLEMENTADO
    this.timer = 5000;
    console.log(' hola');
    }

    preUpdate(t,dt){
        this.timer -= dt;
        if(this.timer <= 0){
            this.generar();
            this.timer = 5000;
        }

        super.preUpdate(t,dt);
    }

    setPosition(pos){
        this.x = pos.x;
        this.y = pos.y;
    }

    generar(){
        if(this.especialidad === 'oro'){
           this.game.recursos.oro += this.cantidad + this.rendimientoAldeanos;
        }
        else if(this.especialidad === 'comida'){
            this.game.recursos.comida += this.cantidad + this.rendimientoAldeanos;
        }
        else if(this.especialidad === 'materiales'){
            this.game.recursos.materiales += this.cantidad + this.rendimientoAldeanos;
        }
    }

    asignarAldeanos(aldeanos){
        this.numAldeanos++;

        let rend = this.rendimientoAldeanos;
        rend += aldeanos.rendimiento.rendGeneral;
        if(this.especialidad = 'oro')rend += aldeanos.rendimiento.rendOro;
        else if(this.especialidad = 'comida')rend += aldeanos.rendimiento.rendComida;
        else if(this.especialidad = 'materiales')rend += aldeanos.rendimiento.rendMateriales;
    }
}
