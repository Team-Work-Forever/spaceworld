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

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('main-scene');
    }

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
            frameWidth: 23.27,
            frameHeight: 40,
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
            frameWidth: 217.39,
            frameHeight: 102,
        });
    }

    create() {
        const { width, height } = this.scale;

        // Run UI
        this.scene.run('ui');

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
                this.events.emit('addScore', item.itemType);
            },
            null,
        );

        this.physics.add.overlap(
            this._player,
            this._asteroidGroup,
            (_, astoroid: Asteroid) => {
                // TODO: Não mostra a animação
                astoroid.play('explode-' + astoroid.sprite);
                astoroid.destroyAndCollect();

                // player leva dano
                // player perde vida
                this._player.take_damage();
            },
            null,
        );

        this.physics.add.overlap(
            this._player.laser_group,
            this._asteroidGroup,
            (laser: Laser, astoroid: Asteroid) => {
                // TODO: Não mostra a animação - Nem a encontra
                astoroid.play('explode-' + astoroid.sprite);

                // TODO: Alteramos isto!
                astoroid.destroyAndCollect();
                laser.destroy();
            },
            null,
        );
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

        this.timer.delay = Phaser.Math.Between(500, 1000);
        this.timer.paused = false;
    }

    update(): void {
        var x = 0.5;
        this._background.tilePositionX += x;

        this._player.update();

        // Recolher items
        this._itemGroup.children.each((item: Item) => {
            this.physics.moveToObject(item, this._player.player_tile, 1000);
        });

        this._info_text.setText([
            'Lifes:',
            this._player.lifes.toString(),
            'Used: ',
            this._player.laser_group.getTotalUsed().toString(),
            'Free: ',
            this._player.laser_group.getTotalFree().toString(),
            'Used -> Asteroids: ',
            this._asteroidGroup.getTotalUsed().toString(),
            'Free -> Asteroids: ',
            this._asteroidGroup.getTotalFree().toString(),
        ]);
    }
}
