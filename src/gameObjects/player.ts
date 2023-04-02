import Phaser from 'phaser';
import MainScene from '../scenes/main-scene';
import LaserGroup from './laser/laser-group';
import Laser from './laser/laser';
import { player_initial_lifes } from '../config';
import game from '../game';

export default class Player extends Phaser.Physics.Arcade.Group {
    private _is_hit: boolean = false;

    private _mouse_gap: number = 150;
    private scale: number = 80;
    private max_lifes: number = player_initial_lifes;
    private _lifes: number = this.max_lifes;

    private x: number;
    private y: number;

    private _weapon_x: number = 5;
    private _weapon_y: number = 55;

    declare body: Phaser.Physics.Arcade.Body;

    private player: Phaser.Physics.Arcade.Sprite;
    private _weapon: Phaser.Physics.Arcade.Sprite;
    private _laser_group: LaserGroup;

    constructor(scene: MainScene, x: number, y: number) {
        super(scene.physics.world, scene, {
            collideWorldBounds: true,
        });

        this._laser_group = new LaserGroup(scene);

        this.x = x;
        this.y = y;

        this.addPlayer();
        this.attach_weapon();
        this.set_animations();

        this.add(this.player);
        this.add(this._weapon);

        this.set_events();

        this.scene.add.existing(this);
    }

    set_events() {
        this.scene.input.on('pointermove', (pointer) => {
            if (
                pointer.y <
                    parseInt(game.config.height.toString()) - this._mouse_gap &&
                pointer.y > this._mouse_gap
            ) {
                this.player.setY(pointer.y);
                this._weapon.setY(pointer.y + this._weapon_y);
            } else {
            }
        });

        this.scene.input.on('pointerdown', () => {
            this.shot_lasers();
        });
    }

    addPlayer() {
        this.player = this.scene.physics.add.sprite(this.x, this.y, 'player');
        this.scene.physics.world.enableBody(this.player);
        this.player.setCollideWorldBounds(true);

        this.player.displayHeight = this.scale;
        this.player.scaleX = this.player.scaleY;
    }

    attach_weapon() {
        this._weapon = this.scene.physics.add.sprite(
            this.x + this._weapon_x,
            this.y + this._weapon_y,
            'weapon',
        );
        this.scene.physics.world.enableBody(this._weapon);
        this._weapon.setCollideWorldBounds(true);

        this._weapon.displayHeight = this.scale;
        this._weapon.scaleX = this._weapon.scaleY;
    }

    set_animations() {
        // Idle animation
        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // hit animation
        this.scene.anims.create({
            key: 'hit',
            frames: this.scene.anims.generateFrameNumbers('player', {
                start: 3,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1,
        });

        // Destroy
        this.scene.anims.create({
            key: 'destroy',
            frames: [{ key: 'player', frame: 6 }],
            frameRate: 8,
            repeat: -1,
        });
    }

    take_damage() {
        this._lifes--;
    }

    shot_lasers() {
        // this._laser_group.fireLaser(this.player.x + this._weapon_x + 145, this.player.y + this._weapon_y - 1, timer);

        const laser = this._laser_group.getFirstDead(true) as Laser;

        if (laser) {
            laser.fire(
                this.player.x + this._weapon_x + 115,
                this.player.y + this._weapon_y - 1,
            );
        }
    }

    public preUpdate(): void {
        if (!this.is_hited) {
            this.player.anims.play('move', true);
        } else {
            this.player.play('hit');

            this.scene.time.addEvent({
                delay: 150,
                callback: () => {
                    this.is_hited = false;
                },
            });
        }

        if (this.lifes <= 0) {
            this.player.play('destroy');
            game.scene.pause('main-scene');
        }
    }

    get player_tile() {
        return this.player;
    }

    get laser_group() {
        return this._laser_group;
    }

    get lifes(): number {
        return this._lifes;
    }

    set is_hited(is_hited: boolean) {
        this._is_hit = is_hited;
    }

    get is_hited() {
        return this._is_hit;
    }
}
