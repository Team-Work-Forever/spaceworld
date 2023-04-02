import game from '../../game';

export default class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    fire(x: number, y: number) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(1500);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (this.x >= parseInt(game.config.width.toString())) {
            this.destroy();
        }
    }
}
