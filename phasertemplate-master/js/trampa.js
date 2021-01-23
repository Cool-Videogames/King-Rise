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
        this.collider = null;
        this.timer = 0;
    }
    preUpdate() {
        super.preUpdate();

        if (this.game.acciones.ataqueEnCurso && this.collider === null && this.enemyStunned === false) {
            this.collider = this.game.physics.add.overlap(this, this.game.oleadasEnemigos.currentWave, (trap, enemy) => {
                this.enemy = enemy;
                if (this.especialidad === 'trampaSuelo') {
                    this.enemy.morir();
                    trap.destruir();
                }
                else if (!this.enemyStunned) {
                    this.enemy.recibirAtaque(15);
                    this.stun(this.enemy, this);
                    this.enemyStunned = true;
                    this.timer = 100;
                }
            })
        }
        else if (!this.game.acciones.ataqueEnCurso && this.collider !== null) {
            this.collider.destroy();
            this.collider = null;
        }
    }
}