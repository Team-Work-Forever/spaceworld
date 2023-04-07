import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';
import gameStorage from '../services/game-storage';
import { audioManager } from '../game';

export interface GameSceneProps {
    score: number;
}

export default class GameOverScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;
    private _current_esteves: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super('game_over-scene');
    }

    create(data: GameSceneProps) {
        gameStorage.store(data.score);

        if (gameStorage.isNewTopScore(data.score)) {
            audioManager.playHighScore();
        } else {
            audioManager.playGameOver();
        }

        const { width, height } = this.scale;

        const textHeight = height / 2 - 200;
        const buttonHeigh = height / 2;
        const gap = 60;

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        // Display's the right menu
        this.add
            .text(width / 2, textHeight, 'Game Over', {
                fontSize: '80px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(
                width / 2,
                textHeight + 150,
                `Score: ${Math.round(data.score).toString()} Points`,
                {
                    fontSize: '25px',
                    fontFamily: 'Days One',
                },
            )
            .setOrigin(0.5, 0.5);

        new SpaceButton(
            this,
            'Restart',
            width / 2,
            buttonHeigh + gap * 2 - 10,
            0.7,
        )
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                audioManager.stopGameOver();

                this.scene.setVisible(true, 'hud');
                this.scene.start('main-scene');
            });

        new SpaceButton(
            this,
            'Menu',
            width / 2,
            buttonHeigh + gap * 3 - 10,
            0.7,
        )
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                audioManager.stopGameOver();

                this.scene.start('start-scene');
            });

        this.anims.create({
            key: 'roll',
            frames: this.anims.generateFrameNumbers('thats_how_we_roll', {
                start: 0,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this._current_esteves = this.spawnEsteves();
    }

    spawnEsteves() {
        const randomY = Phaser.Math.Between(50, 750);
        const randomX = Phaser.Math.RND.between(0, 1);
        const esteves = this.physics.add.sprite(
            randomX == 0 ? window.innerWidth + 50 : 0 - 50,
            randomY,
            'thats_how_we_roll',
        );

        esteves.setGravityX(randomX == 0 ? -25 : 25);
        esteves.setVelocityY(5);
        esteves.displayHeight = 150;
        esteves.scaleX = esteves.scaleY;

        this.add.existing(esteves);

        esteves.play('roll');

        return esteves;
    }

    destroyEsteves() {
        this._current_esteves.destroy();
        this._current_esteves = null;
    }

    update() {
        this._background.tilePositionX += background_menu_velocity;

        if (!this._current_esteves) {
            this._current_esteves = this.spawnEsteves();
        }
        if (
            this._current_esteves.x > window.innerWidth + 55 ||
            this._current_esteves.x < -55
        ) {
            this.destroyEsteves();
        }
    }
}
