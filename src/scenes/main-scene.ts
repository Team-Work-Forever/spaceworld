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

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('main-scene');
    }

    private _is_inverted: boolean = false;
    private _speed: number = -200;
    private _level: number = 1;
    private _player: Player;
    public _itemGroup: ItemGroup;
    public _asteroidGroup: AsteroidGroup;
    private timer: any;
    private _background: Phaser.GameObjects.TileSprite;

    private _info_text: GameObjects.Text;

    private _asteroid_factory: AsteroidFactory = new AsteroidFactory(this);

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
    }

    create() {
        const { width, height } = this.scale;

        // Run UI
        this.scene.run('hud');

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0);

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
        this._info_text = this.add.text(0, 0, 'itemType OLÉÉÉÉ OLÉÉÉÉ OLÉÉÉÉ', {
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
                    this.invertWorld();
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

                // player leva dano
                this.events.emit('hitPlayer', this._player.lifes);
                this._player.take_damage();
                this._player.is_hited = true;
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

    private invertWorld() {
        const camera = this.cameras.main;

        if (this._is_inverted) {
            camera.zoomTo(-1, 1000);
        } else {
            camera.zoomTo(1, 1000);
        }

        this._is_inverted = !this._is_inverted;
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
        this.events.emit('energyChanged', this._player.weapon_stress);

        // Recolher items
        this._itemGroup.children.each((item: Item) => {
            this.physics.moveToObject(item, this._player.player_tile, 1000);
        });

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
        ]);
    }
}
