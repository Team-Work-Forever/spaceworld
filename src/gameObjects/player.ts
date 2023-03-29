import Phaser from "phaser";
import MainScene from "../scenes/main-scene";
import LayserGroup from "./layser/laser-group";

export default class Player extends Phaser.Physics.Arcade.Group {

    private velocity: number = 500

    private x: number
    private y: number

    private _weapon_x: number = 5;
    private _weapon_y: number = 65;

    declare body: Phaser.Physics.Arcade.Body;

    private player: Phaser.Physics.Arcade.Sprite;
    private _weapon: Phaser.Physics.Arcade.Sprite;
    private _layser_group: LayserGroup;

    constructor(scene: MainScene, x: number, y: number) {

        super(scene.physics.world, scene, {
            collideWorldBounds: true,
        });

        this._layser_group = new LayserGroup(scene);

        this.x = x;
        this.y = y;

        this.addPlayer();
        this.attach_weapon();
        this.set_animations();

        this.add(this.player);
        this.add(this._weapon);

        this.set_events()

        this.scene.add.existing(this);

    }

    set_events() {

        this.scene.input.on('pointermove', pointer => {
            this.player.setY(pointer.y)
            this._weapon.setY(pointer.y + this._weapon_y)
        })

        this.scene.input.on('pointerdown', () => {
            this.shotLasers();
        })

    }

    addPlayer() {
        this.player = this.scene.physics.add.sprite(this.x, this.y, 'player');
        this.scene.physics.world.enableBody(this.player);
        this.player.setCollideWorldBounds(true);
    }

    attach_weapon() {
        this._weapon = this.scene.physics.add.sprite(this.x + this._weapon_x, this.y + this._weapon_y, 'weapon');
        this.scene.physics.world.enableBody(this._weapon);
        this._weapon.setCollideWorldBounds(true);
    }

    setDefault() {
        this.setVelocityY(0);
    }

    moveUp() {
        this.setVelocityY(-this.velocity);
    }

    moveDown() {
        this.setVelocityY(this.velocity);
    }

    set_animations() {

        // Idle animation
        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers(
                'player',
                { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // hit animation
        this.scene.anims.create({
            key: 'hit',
            frames: this.scene.anims.generateFrameNumbers(
                'player',
                { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        // Destroy
        this.scene.anims.create({
            key: 'destroy',
            frames: [{ key: 'player', frame: 6 }],
            frameRate: 8,
            repeat: -1
        });

    }

    shotLasers() {
        this._layser_group.fireLayser(this.player.x + this._weapon_x + 145, this.player.y + this._weapon_y - 1);
    }

    update() {
        this.player.anims.play('move', true)
    }

    get player_tile() {
        return this.player;
    }

    get laser_group() {
        return this._layser_group;
    }
}