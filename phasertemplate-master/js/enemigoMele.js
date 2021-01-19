import Enemigo from "./enemigo.js"
import * as config from "./config.js";

export default class EnemigoMele extends Enemigo {
    constructor(scene, pos) {
        let meleeInfo = config.enemigo;
        super(scene, pos, meleeInfo.vida, meleeInfo.dmg, 'frances');

        this.moveSpeed = meleeInfo.speed;
        this.range = meleeInfo.rango;
        this.damage = meleeInfo.dmg;
        this.attackTime = meleeInfo.cadencia;
        this.move();
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}