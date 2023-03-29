import { Scene } from "phaser";

export default class Item extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'item');
    }

    display(x: number, y: number) {

        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(70);
        this.setVelocityY(70);

    }


}