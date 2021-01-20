import EdificioDefensivo from "./edificioDefensivo.js";

export default class Trampa extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.especialidad = especialidad;
        this.game = scene;
        this.hasMenu = false;
        this.aldeanosAsignables = false;
        this.enemyStunned = false;
        this.enemy = null;
        this.timer = 0;
        this.collider = null;
    }
    preUpdate() {
        super.preUpdate();
        if (this.enemyStunned) {
            console.log("STUNEADO");
            this.timer--;
            if (this.timer <= 0) {
                this.enemyStunned = false
                this.enemy.stuneado = false;
                this.enemy.move();
                this.enemy.setTexture('frances');
                this.destruir();
            }
        }
        if (this.game.acciones.ataqueEnCurso && this.collider === null && this.enemyStunned === false) {
            this.collider = this.game.physics.add.overlap(this, this.game.oleadasEnemigos.currentWave, (trap, enemy) => {
                this.enemy = enemy;
                if (this.especialidad === 'trampaSuelo') {
                    this.enemy.destroy();
                    trap.destruir();
                }
                else if (!this.enemyStunned) {
                    this.atacar(this.enemy, 15);
                    this.stun(this.enemy);
                }
            })
        }
        else if (!this.game.acciones.ataqueEnCurso && this.collider !== null) {
            this.collider.destroy();
            this.collider = null;
        }
    }
}