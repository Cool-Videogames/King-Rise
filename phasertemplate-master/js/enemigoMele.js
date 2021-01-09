import Enemigo from "./enemigo.js"
import * as config from "./config.js";

export default class EnemigoMele extends Enemigo {
    constructor(scene, pos) {
        let meleeInfo = config.meleeEnemy;
        super(scene, pos, meleeInfo.Health, meleeInfo.AtackDamage, 'frances');

        this.esMelee = true;
        this.moveSpeed = meleeInfo.MovementSpeed;
        this.range = meleeInfo.AtackDistance;
        this.damage = meleeInfo.AtackDamage;
        this.attackTime = meleeInfo.AtackTime;
        this.move();
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}