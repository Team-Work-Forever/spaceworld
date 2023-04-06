import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';

export default class StartScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('start-scene');
    }

    init() {}

    preload() {
        this.load.image('background', '../assets/background.png');
        this.load.image('spacebutton', '../assets/ui/space_button.png');
        this.load.spritesheet('esteves-adv', '../assets/ui/steves_adv.png', {
            frameWidth: 242,
            frameHeight: 211,
        });
    }

    create() {
        const { width, height } = this.scale;

        const textHeigh = height / 2 - 200;
        const buttonHeigh = height / 2 - 60;
        const gap = 80;

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        this.addEsteves(height);

        // Display's the right menu
        this.add
            .text(width / 2, textHeigh, 'Space World', {
                fontSize: '84px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(width / 2, textHeigh + 65, 'Peanuts War', {
                fontSize: '42px',
                color: '#FC8F2B',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        new SpaceButton(this, 'Start Game', width / 2, buttonHeigh + gap * 1, 1)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {})
            .setScale(1)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('history-scene');
            });

        new SpaceButton(
            this,
            'High Score',
            width / 2,
            buttonHeigh + gap * 2,
            0.7,
        )
            .setInteractive()
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
                () => {
                    this.scene.start('score-scene');
                },
                this,
            );

        new SpaceButton(
            this,
            'Controllers',
            width / 2,
            buttonHeigh + gap * 3 - 10,
            0.7,
        )
            .setInteractive()
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
                () => {
                    this.scene.start('controller-scene');
                },
                this,
            );
    }

    addEsteves(height: number) {
        const esteves = this.add.sprite(80, height - 150, 'esteves-adv');
        esteves.displayHeight = 300;
        esteves.scaleX = esteves.scaleY;

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('esteves-adv', {
                start: 0,
                end: 20,
            }),
            frameRate: 10,
            repeat: -1,
        });

        esteves.play('jump');
    }

    update() {
        this._background.tilePositionX += background_menu_velocity;
    }
}
