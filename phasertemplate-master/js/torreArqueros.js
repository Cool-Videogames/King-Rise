import EdificioDefensivo from "./edificioDefensivo.js";

export default class TorreArqueros extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.body.setSize(this.body.width * rango, this.body.height * rango);
        this.arrow = null;
        this.enemy = null;
        this.fireRate = 0; //Tiempo en ms

        scene.physics.add.overlap(this, this.game.jug, (turret, enemy) => {
            if (this.arrow === null && this.fireRate <=0) {
                this.fireRate = 2000;
                this.enemy = enemy;
                this.arrow = scene.physics.add.sprite(this.x, this.y, 'flecha');
                this.arrow.body.setSize(this.arrow.width / 1.5, this.arrow.height / 2.5);

                scene.physics.add.overlap(this.arrow, this.game.jug, (arrow, enemy) => {
                    arrow.destroy();
                    this.arrow = null;
                    this.atacar(enemy, 10);
                })
            }
        });
    }

    preUpdate(t, dt) {
        this.fireRate-=dt;
        if (this.arrow !== null) {
            let angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.arrow.x, this.arrow.y);
            this.arrow.setRotation(angle);
            this.game.physics.moveTo(this.arrow, this.enemy.x, this.enemy.y, 200);
        }
        super.preUpdate(t, dt);
    }
}