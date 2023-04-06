import { game } from '../../game';

export default class Laser extends Phaser.Physics.Arcade.Sprite {
    private max_speed: number = 1500;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    fire(x: number, y: number) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(this.max_speed);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (this.x >= parseInt(game.config.width.toString())) {
            this.destroy();
        }
    }
}
