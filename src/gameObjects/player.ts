import Phaser from "phaser";
import MainScene from "../scenes/main-scene";
import KeyBoardInput from "../utils/cursor-utils";

export default class Player extends Phaser.GameObjects.Group {

    declare body: Phaser.Physics.Arcade.Body;
    private in: KeyBoardInput
    private player: Phaser.Physics.Arcade.Sprite;
    private velocity: number = 500

    constructor(scene: MainScene, x: number, y: number) {
        super(scene);

        this.in = scene.in;

        this.addPlayer(x, y);

        this.add(this.player);
        this.scene.add.existing(this)
    }

    addPlayer(x: number, y: number) {
        this.player = this.scene.physics.add.sprite(x, y, 'player');
        this.scene.physics.world.enableBody(this.player);
        this.player.setCollideWorldBounds(true);
    }

    setDefault() {
        this.player.setVelocityY(0);
    }

    moveUp() {
        this.player.setVelocityY(-this.velocity);
    }

    moveDown() {
        this.player.setVelocityY(this.velocity);
    }

    update() {
        if (this.in.cursor.up.isDown)
            this.moveUp()
        else if (this.in.cursor.down.isDown)
            this.moveDown()
        else
            this.setDefault()
    }

}