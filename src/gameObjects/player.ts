import Phaser from 'phaser';
import MainScene from '../scenes/main-scene';
import LaserGroup from './laser/laser-group';
import Laser from './laser/laser';
import { player_initial_lifes, player_max_lifes } from '../config';
import game from '../game';
import { KeyBoardInput } from '../utils';
import Shield from './shield';

export default class Player extends Phaser.Physics.Arcade.Group {
    private keyboard: KeyBoardInput;
    private last: number = 0;

    private _is_hit: boolean = false;

    private _mouse_gap: number = 150;
    private scale: number = 80;
    private max_lifes: number = player_initial_lifes;
    private _lifes: number = this.max_lifes;

    private x: number;
    private y: number;

    // Weapon
    private _weapon_stress_out: boolean = false;
    private _weapon_fire_rate: number = 0.15;
    private _weapon_max_stress: number = 100;
    private _weapon_stress: number = 0;
    private _weapon_x: number = 5;
    private _weapon_y: number = 55;
    private _shield_x: number = 140;
    private _shield_y: number = 10;
    private _is_active_shild: boolean = false;

    declare body: Phaser.Physics.Arcade.Body;

    // Shield not from Marvel
    private _shield: Shield;
    private player: Phaser.Physics.Arcade.Sprite;
    private _weapon: Phaser.Physics.Arcade.Sprite;
    private _laser_group: LaserGroup;

    // Player sounds
    private _laser_sound: Phaser.Sound.BaseSound;
    private _damage_sound: Phaser.Sound.BaseSound;

    constructor(scene: MainScene, x: number, y: number) {
        super(scene.physics.world, scene, {
            collideWorldBounds: true,
        });

        this._laser_group = new LaserGroup(scene);
        this.keyboard = new KeyBoardInput(scene);

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
                this.scene.tweens.add({
                    targets: this.player_tile,
                    y: pointer.y,
                    duration: 100,
                    ease: 'Sine.easeOut',
                });

                this.scene.tweens.add({
                    targets: this._weapon,
                    y: pointer.y + this._weapon_y,
                    duration: 100,
                    ease: 'Sine.easeOut',
                });

                this.scene.tweens.add({
                    targets: this._shield,
                    y: pointer.y + this._shield_y,
                    duration: 100,
                    ease: 'Sine.easeOut',
                });
            }
        });
    }

    addPlayer() {
        this.player = this.scene.physics.add.sprite(this.x, this.y, 'player');
        this.scene.physics.world.enableBody(this.player);
        this.player.setCollideWorldBounds(true);

        this.player.displayHeight = this.scale;
        this.player.scaleX = this.player.scaleY;

        this._laser_sound = this.scene.sound.add('laser-sound');
        this._damage_sound = this.scene.sound.add('esteves-damage');
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

    sheildIncrementLife() {
        this._shield.increaseLife();
    }

    shield_take_damage() {
        if (this._shield.life < 5) {
            this.detach_shield();
            return;
        }

        this._shield.decreaseLife(Math.ceil(100 / 3));
    }

    attach_shield() {
        if (this._is_active_shild) {
            return;
        }

        this._shield = new Shield(
            this.scene,
            this.x + this._shield_x,
            this.y + this._shield_y,
        );

        this.scene.physics.world.enableBody(this._shield);
        this._shield.setCollideWorldBounds(true);

        this._shield.displayHeight = this.scale + 100;
        this._shield.scaleX = this._shield.scaleY;

        this._is_active_shild = true;
    }

    detach_shield() {
        this._shield.destroy();
        this._is_active_shild = false;
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

        // Hit animation
        this.scene.anims.create({
            key: 'hit',
            frames: this.scene.anims.generateFrameNumbers('player', {
                start: 3,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1,
        });

        // Destroy Animation
        this.scene.anims.create({
            key: 'destroy',
            frames: [{ key: 'player', frame: 6 }],
            frameRate: 8,
            repeat: -1,
        });

        // Weapon Stress Animation
        this.scene.anims.create({
            key: 'stress',
            frames: this.scene.anims.generateFrameNumbers('weapon', {
                start: 2,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Weapon Idle Animation
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('weapon', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Weapon First Animation
        this.scene.anims.create({
            key: 'first',
            frames: this.scene.anims.generateFrameNumbers('weapon', {
                start: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    // Increment Player life
    increment_life() {
        if (this._lifes < player_max_lifes) {
            this._lifes++;
        }
    }

    // Decrease Player Life
    take_damage() {
        if (this.lifes > 0) {
            this._lifes--;
        }
        this._damage_sound.play();
    }

    // Shot Layers
    shot_lasers(time: number) {
        this._weapon.stop();
        if (
            time > this.last &&
            !this._weapon_stress_out &&
            this._weapon_stress < this._weapon_max_stress
        ) {
            const laser = this._laser_group.getFirstDead(true) as Laser;

            if (laser) {
                laser.fire(
                    this.player.x + this._weapon_x + 115,
                    this.player.y + this._weapon_y - 1,
                );
                this.last = time + 150;
                this._weapon_stress += 10;
                this._weapon.play('idle', true);
                this._laser_sound.play();
            }
        }
    }

    public preUpdate(time: number): void {
        if (this.keyboard.cursor.space.isDown && !this._weapon_stress_out) {
            this.shot_lasers(time);
        }

        if (this._weapon_stress > this._weapon_max_stress) {
            this._weapon_stress_out = true;
        } else if (this._weapon_stress <= 5) {
            this._weapon_stress_out = false;
        }

        if (this._weapon_stress > 5) {
            this._weapon_stress -= this._weapon_fire_rate;
        }

        if (this._weapon_stress_out) {
            this._weapon.play('stress', true);
        } else {
            this._weapon.play('first');
        }

        if (!this.is_hited) {
            this.player.anims.play('move', true);
        } else {
            this.player.play('hit', true);

            this.scene.time.addEvent({
                delay: 150,
                callback: () => {
                    this.is_hited = false;
                },
            });
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

    get weapon_stress() {
        return this._weapon_stress;
    }

    get permission() {
        return this._weapon_stress_out;
    }

    get is_active_shield() {
        if (this._shield) {
            return this._is_active_shild;
        }

        return false;
    }

    get _shield_lifes() {
        if (this._shield) {
            return this._shield.life;
        }
        return 0;
    }
}
