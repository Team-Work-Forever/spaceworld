import Phaser from "phaser";
import { Asteroid } from "../gameObjects/asteroids/asteroid";
import BlueAsteroid from "../gameObjects/asteroids/asteroids/blue-asteroid";
import PurpleAsteroid from "../gameObjects/asteroids/asteroids/purple-asteroid";
import YellowAsteroid from "../gameObjects/asteroids/asteroids/yellow-asteroid";
import ItemGroup from "../gameObjects/items/item-group";
import Player from "../gameObjects/player";

export default class MainScene extends Phaser.Scene {

    private _player: Player
    private _itemGroup: ItemGroup
    private timer: any;

    preload() {

        this.load.image('background', '../assets/background.png')
        this.load.image('bullet', '../assets/bullet.png')
        this.load.spritesheet('item', '../../assets/item.png', { frameWidth: 23.27, frameHeight: 40 });
        this.load.spritesheet('items', '../../assets/items-menu.png', { frameWidth: 57, frameHeight: 98 });
        this.load.spritesheet('blue_asteroid', '../../assets/blue_asteroid.png', { frameWidth: 101.98, frameHeight: 100 });
        this.load.spritesheet('purple_asteroid', '../../assets/purple_asteroid.png', { frameWidth: 111.45, frameHeight: 100 });
        this.load.spritesheet('yellow_asteroid', '../../assets/yellow_asteroid.png', { frameWidth: 109.93, frameHeight: 100 });
        this.load.spritesheet('player', '../../assets/sprite_nave.png', { frameWidth: 346.14, frameHeight: 100 });
        this.load.spritesheet('weapon', '../../assets/weapon.png', { frameWidth: 217.39, frameHeight: 102 });
    }

    create() {

        const { width, height } = this.scale;
        this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0).setScrollFactor(0, 0)

        this._itemGroup = new ItemGroup(this, 10);

        this._player = new Player(this, 200, this.input.mousePointer.y);

        // Setup Timer

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnAsteroids,
            callbackScope: this,
            loop: true
        });

        // Collisions

        this.physics.add.overlap(this._player, this._itemGroup, (_, item) => {
            item.destroy()
        }, null)

    }

    scrollBackground() {



    }

    activateAsteroid(asteroid: Asteroid) {
        asteroid.setActive(true)
        asteroid.setActive(true)
        asteroid.play('spin')
    }

    spawnAsteroids() {

        var randomY = Phaser.Math.Between(50, 750);
        var objectType = Phaser.Math.Between(1, 3);
        var scale = Phaser.Math.Between(0.2, 1);
        var object: Asteroid;

        switch (objectType) {
            case 1:
                object = new BlueAsteroid(this, window.innerWidth + 50, randomY)
                break;
            case 2:
                object = new YellowAsteroid(this, window.innerWidth + 50, randomY)
                break;
            case 3:
                object = new PurpleAsteroid(this, window.innerWidth + 50, randomY)
                break;
        }

        object.play("spin-" + object.sprite)
        object.setScale(scale);
        object.setGravityX(-100);
        object.body.velocity.y = 10;

        this.timer.delay = Phaser.Math.Between(500, 1000);
        this.timer.paused = false;

    }

    update(): void {

        this._player.update();

        // this._itemGroup.showItems(100, 100);

        // this._itemGroup.children.each((item) => {
        //     this.physics.moveToObject(item, this._player.player_tile, 500);
        // });

    }
}


