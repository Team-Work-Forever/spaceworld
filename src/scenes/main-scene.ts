import Phaser, { GameObjects } from 'phaser';
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

export default class MainScene extends Phaser.Scene {
    private _speed: number;
    private _level: number;
    private _player: Player;
    public _itemGroup: ItemGroup;
    public _asteroidGroup: AsteroidGroup;
    private timer: any;
    private _background: Phaser.GameObjects.TileSprite;

    private _info_text: GameObjects.Text;

    private _asteroid_factory: AsteroidFactory = new AsteroidFactory(this);
    private _total_score: number = 0;

    constructor() {
        super('main-scene');
    }

    init() {
        this._speed = -200;
        this._level = 1;
    }

    preload() {
        this.load.image('background', '../assets/background.png');
        this.load.image('bullet', '../assets/bullet.png');
        this.load.spritesheet('item', '../../assets/item.png', {
            frameWidth: 18.25,
            frameHeight: 33,
        });
        this.load.spritesheet('items', '../../assets/items-menu.png', {
            frameWidth: 57,
            frameHeight: 98,
        });
        this.load.spritesheet(
            'blue_asteroid',
            '../../assets/blue_asteroid.png',
            { frameWidth: 101.98, frameHeight: 100 },
        );
        this.load.spritesheet(
            'purple_asteroid',
            '../../assets/asteroid_purple_sprite.png',
            { frameWidth: 125.9, frameHeight: 59 },
        );
        this.load.spritesheet(
            'yellow_asteroid',
            '../../assets/yellow_asteroid_sprite.png',
            { frameWidth: 112, frameHeight: 53 },
        );
        this.load.spritesheet('player', '../../assets/sprite_nave.png', {
            frameWidth: 346.14,
            frameHeight: 100,
        });
        this.load.spritesheet('weapon', '../../assets/weapon.png', {
            frameWidth: 217,
            frameHeight: 102,
        });
        this.load.image('shield', '../assets/shield.png');
    }

    create() {
        const { width, height } = this.scale;

        // Run UI
        this.scene.run('hud');

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0);

        this.setUpCount();

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

        // UI
        this._info_text = this.add.text(0, 0, 'itemType', {
            color: '#00ff00',
        });

        // Collisions

        // Apanha o item
        this.physics.add.overlap(
            this._player,
            this._itemGroup,
            (_, item: Item) => {
                item.destroy();

                if (item.itemType === ItemType.HEART) {
                    this.events.emit('catchLife', this._player.lifes);
                    this._player.increment_life();

                    if (this._player.lifes === player_max_lifes) {
                        this.events.emit(
                            'addScore',
                            Phaser.Math.RND.integerInRange(0, 2),
                            10,
                        );
                    }
                } else if (item.itemType === ItemType.SCALE_PILL) {
                    if (this._player.is_active_shield) {
                        this._player.sheildIncrementLife();
                    } else {
                        this._player.attach_shield();
                    }
                } else {
                    this.events.emit('addScore', item.itemType);
                }
            },
            null,
        );

        // Player colide com os asteroides
        this.physics.add.overlap(
            this._player,
            this._asteroidGroup,
            (_, astoroid: Asteroid) => {
                astoroid.destroyAndCollect(false);

                if (!this._player.is_active_shield) {
                    this.events.emit('hitPlayer', this._player.lifes);
                    this._player.take_damage();
                    this._player.is_hited = true;
                } else {
                    this._player.shield_take_damage();
                }

                if (this._player.lifes <= 0) {
                    this.gameover();
                }

                this.cameras.main.shake(250, 0.005);
            },
            null,
        );

        // Laser colide com asteroid
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
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.setVisible(false, 'hud');
                this.scene.start('game_over-scene', {
                    score: Math.trunc(this._level) * this._total_score,
                } as GameSceneProps);
            },
        });
    }

    setUpCount() {
        const { width, height } = this.scale;
        const textHeight = height / 2 - 200;
        const opt: string[] = ['3', '2', '1', 'Start!'];
        const timePerText: number = 1500;

        // Pause a cena atual
        this.scene.pause();

        // Loop para exibir a contagem regressiva
        for (let i = 0; i < opt.length; i++) {
            setTimeout(() => {
                const text = this.add
                    .text(width / 2, textHeight, opt[i], {
                        fontSize: '108px',
                        fontFamily: 'Days One',
                    })
                    .setOrigin(0.5, 0.5);
                // Remove o número após 2 segundos
                setTimeout(() => {
                    text.destroy();
                }, timePerText - 100);
            }, i * timePerText); // Define um atraso crescente para cada iteração
        }

        setTimeout(() => {
            this.scene.resume(this);
        }, timePerText * opt.length);
    }

    spawnAsteroids() {
        const randomY = Phaser.Math.Between(50, 750);
        const objectType = Phaser.Math.Between(1, 3);
        const scale = Phaser.Math.Between(50, 150);
        let object: Asteroid;

        //Melhorar isto!
        switch (objectType) {
            case 1:
                object = this._asteroid_factory.createBlueAsteroid(
                    window.innerWidth + 150,
                    randomY,
                );
                break;
            case 2:
                object = this._asteroid_factory.createYellowAsteroid(
                    window.innerWidth + 150,
                    randomY,
                );
                break;
            case 3:
                object = this._asteroid_factory.createPurpleAsteroid(
                    window.innerWidth + 150,
                    randomY,
                );
                break;
        }

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

        // Recolher items
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

        // TODO: Retirar isto!
        this._info_text.setText([
            'Used: ',
            this._player.laser_group.getTotalUsed().toString(),
            'Free: ',
            this._player.laser_group.getTotalFree().toString(),
            'Used -> Asteroids: ',
            this._asteroidGroup.getTotalUsed().toString(),
            'Free -> Asteroids: ',
            this._asteroidGroup.getTotalFree().toString(),
            'Weapon Stress: ',
            this._player.weapon_stress.toString(),
            'Lifes: ',
            this._player.lifes.toString(),
            'Permition: ',
            this._player.permission.toString(),
            'Asteroid_velocity: ',
            this._level.toString(),
        ]);
    }

    set total_score(score: number) {
        this._total_score = score;
    }
}
