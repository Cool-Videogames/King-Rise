import Enemigo from "./enemigo.js"
import * as config from "./config.js";

export default class EnemigoMele extends Enemigo {
    constructor(scene, pos) {
        let meleeInfo = config.meleeEnemy;
        super(scene, pos, meleeInfo.Health, meleeInfo.AtackDamage, 'frances');

        this.moveSpeed = meleeInfo.MovementSpeed;
        this.objetivo = this.objetivoMasCercano(true);
        this.range = meleeInfo.AtackDistance;
        this.move();
    }




    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}