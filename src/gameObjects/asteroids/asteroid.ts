import { Scene } from "phaser";

export class Asteroid extends Phaser.Physics.Arcade.Sprite {

    declare body: Phaser.Physics.Arcade.Body;
    private _sprite: string;

    constructor(scene: Scene, x: number, y: number, sprite: string) {
        super(scene, x, y, sprite);
        this._sprite = sprite;

        this.setAnimention();

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    protected setAnimention() { }

    get sprite() {
        return this._sprite;
    }

    // display(x: number, y: number) {
    //     this.body.reset(x, y);
    //     this.setActive(true);
    //     this.setVisible(true);
    // }

}