import Phaser from 'phaser';
import {
    AsteroidFactory,
    AsteroidGroup,
    Asteroid,
} from '../gameObjects/asteroids';
import ItemGroup from '../gameObjects/items/item-group';
import Laser from '../gameObjects/laser/laser';
import Player from '../gameObjects/player';
import Item from '../gameObjects/items/item';
import { ItemType } from '../gameObjects/items/item-type';
import {
    background_velocity,
    increment_velocity_asteroids,
    player_max_lifes,
} from '../config';
import { GameSceneProps } from './game-over-scene';
import { audioManager } from '../game';

export default class MainScene extends Phaser.Scene {
    private _speed: number;
    private _level: number;
    private _player: Player;
    public _itemGroup: ItemGroup;
    public _asteroidGroup: AsteroidGroup;
    private timer: any;
    private _background: Phaser.GameObjects.TileSprite;

    private _asteroid_factory: AsteroidFactory = new AsteroidFactory(this);

    // Points
    private _points: number[] = [0, 0, 0]; // Blue, Yellow, Purple
    private _points_per_crystal: number = 1;
    private _points_per_heart: number = 10;

    constructor() {
        super('main-scene');
    }

    init() {
        this._speed = -200;
        this._level = 1;
        this._points = [0, 0, 0];
    }

    create() {
        const { width, height } = this.scale;

        // Run UI
        this.scene.launch('hud');
        this.scene.bringToTop('hud');

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0);

        this.setUpCount(1000);

        this._itemGroup = new ItemGroup(this, 10);
        this._itemGroup.clear(true, true);

        this._asteroidGroup = new AsteroidGroup(this, 100);

        this._player = new Player(this, 200, this.input.mousePointer.y);

        // Setup Timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnAsteroids,
            callbackScope: this,
            loop: true,
        });

        // Collisions

        // Collect item
        this.physics.add.overlap(
            this._player,
            this._itemGroup,
            (_, item: Item) => {
                item.destroy();

                if (item.itemType === ItemType.HEART) {
                    this._player.increment_life();
                    this.events.emit('displayLifes', this._player.lifes);

                    if (this._player.lifes === player_max_lifes) {
                        const itemType: ItemType =
                            Phaser.Math.RND.integerInRange(0, 2);
                        this._points[itemType] += this._points_per_heart;
                        this.events.emit(
                            'displayScore',
                            itemType,
                            this._points[itemType],
                        );
                    }
                } else if (item.itemType === ItemType.SCALE_PILL) {
                    if (this._player.is_active_shield) {
                        this._player.sheildIncrementLife();
                    } else {
                        this._player.attach_shield();
                    }
                } else {
                    this._points[item.itemType] += this._points_per_crystal;
                    this.events.emit(
                        'displayScore',
                        item.itemType,
                        this._points[item.itemType],
                    );
                }
            },
            null,
        );

        // Player colide with asteroids
        this.physics.add.overlap(
            this._player,
            this._asteroidGroup,
            (_, astoroid: Asteroid) => {
                astoroid.destroyAndCollect(false);

                if (!this._player.is_active_shield) {
                    this._player.take_damage();
                    this.events.emit('displayLifes', this._player.lifes);
                    this._player.is_hited = true;
                } else {
                    this._player.shield_take_damage();
                }

                if (this._player.lifes <= 0) {
                    this.gameover();
                }

                audioManager.playDestroyAsteroid();

                this.cameras.main.shake(250, 0.005);
            },
            null,
        );

        // Laser colide with asteroid
        this.physics.add.overlap(
            this._player.laser_group,
            this._asteroidGroup,
            (laser: Laser, astoroid: Asteroid) => {
                astoroid.destroyAndCollect(true);
                laser.destroy();
                this.cameras.main.shake(250, 0.002);
            },
            null,
        );
    }

    private gameover() {
        this._player.player_tile.play('destroy');
        audioManager.playDestroyAsteroid();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                // this.scene.setVisible(false, 'hud');
                this.scene.sendToBack('hud');
                this.scene.start('game_over-scene', {
                    score: Math.trunc(this._level) * this.getTotalPoints(),
                } as GameSceneProps);
            },
        });
    }

    private getTotalPoints(): number {
        let sum = 0;

        for (let i = 0; i < this._points.length; i++) {
            sum += this._points[i];
        }

        return sum;
    }

    setUpCount(timePerText: number) {
        const { width, height } = this.scale;
        const textHeight = height / 2 - 200;
        const opt: string[] = ['3', '2', '1', 'Start!'];

        // Pause atual scene
        this.scene.pause();

        // Loop to countdown
        for (let i = 0; i < opt.length; i++) {
            setTimeout(() => {
                const text = this.add
                    .text(width / 2, textHeight, opt[i], {
                        fontSize: '108px',
                        fontFamily: 'Days One',
                    })
                    .setOrigin(0.5, 0.5);

                if (i == opt.length - 1) {
                    audioManager.playSingleCounter();
                } else {
                    audioManager.playStartCounter();
                }
                // Remove number after 2 seconds
                setTimeout(() => {
                    text.destroy();
                }, timePerText - 100);
            }, i * timePerText); // Define delay
        }

        setTimeout(() => {
            this.scene.resume(this);
        }, timePerText * opt.length);
    }

    spawnAsteroids() {
        const randomY = Phaser.Math.Between(50, window.innerHeight - 50);
        const scale = Phaser.Math.Between(50, 150);
        let object: Asteroid;

        object = this._asteroid_factory.createRandom(
            window.innerWidth + 150,
            randomY,
        );

        this._asteroidGroup.add(object);

        object.play('spin-' + object.sprite);
        object.displayHeight = scale;
        object.scaleX = object.scaleY;

        object.setGravityX(this._speed * this._level);
        this._level += increment_velocity_asteroids;

        this.timer.delay = Phaser.Math.Between(500, 1000);
        this.timer.paused = false;
    }

    update(): void {
        // Background velocity
        this._background.tilePositionX += background_velocity;

        // Update Energy Bar
        this.events.emit(
            'energyChanged',
            this._player.weapon_stress,
            this._player.permission,
        );

        // Collect items
        this._itemGroup.children.each((item: Item) => {
            this.physics.moveToObject(item, this._player.player_tile, 1000);
        });

        // Update Shield Bar
        this.events.emit(
            'shieldChanged',
            this._player._shield_lifes,
            this._player.is_active_shield,
        );

        // Update Level
        this.events.emit('updateLevel', this._level);
    }
}
