export default class Laser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    fire(x: number, y: number) {

        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(900);

    }

    protected preUpdate(time: number, delta: number): void {

        super.preUpdate(time, delta);

        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }

    }

}