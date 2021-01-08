import Edificio from "./edificio.js";

export default class EdificioSocial extends Edificio{
    constructor(scene,vida,coste,posicion,ancho,alto,felicidad,aldeanosMax, key){
        super(scene,vida,coste,posicion,ancho,alto, key);
        this.cantidad= felicidad;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.timer = 5000;
    }
    asignarAldeanos(aldeanos){
        this.numAldeanos+= aldeanos;
    }
    setMenu(){
        //this.initMarco();
        //this.createMasMenos();
        //this.creaText();
        //this.asignaInput();
    }
}
