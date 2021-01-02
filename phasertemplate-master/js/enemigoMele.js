import Enemigo from "./enemigo.js"
import * as config from "./config.js";

export default class EnemigoMele extends Enemigo{
    constructor(scene, pos){
        let meleeInfo = config.meleeEnemy;
        super(scene, pos,meleeInfo.meleeHealth, meleeInfo.meleeAtackDamage, 'frances');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}