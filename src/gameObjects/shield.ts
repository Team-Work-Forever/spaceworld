export default class Shield extends Phaser.Physics.Arcade.Sprite {
    private _max_life: number = 100;
    private _life: number = this._max_life;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'shield');

        scene.add.existing(this);
    }

    increaseLife() {
        this._life = this._max_life;
    }

    decreaseLife(damage: number) {
        if (this._life > 0) {
            this._life -= damage;
        }
    }

    get life() {
        return Math.abs(this._life);
    }
}
