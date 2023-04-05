import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';

export default class ControllerScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('controller-scene');
    }

    preload() {
        this.load.image('background', '../assets/background.png');
        this.load.image('spacebutton', '../assets/ui/space_button.png');
        this.load.image('space', '../assets/comands/space_button.png');
        this.load.image('up_down', '../assets/comands/up_down_keys.png');
        this.load.image('mouse', '../assets/comands/mouse.png');
    }

    create() {
        const { width, height } = this.scale;

        const textHeight = height / 2 - 200;
        const buttonHeigh = height / 2;
        const gap = 60;

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        // Controllers
        this.add.text(width / 2 - 150, height / 2 - 85, 'Fire', {
            fontFamily: 'Days One',
            fontSize: '34px',
        });

        this.add
            .image(width / 2 + 125, height / 2 - 65, 'space')
            .setOrigin(0.5, 0.5)
            .setScale(1.5);

        this.add.text(width / 2 - 150, height / 2, 'Move', {
            fontFamily: 'Days One',
            fontSize: '34px',
        });

        this.add
            .image(width / 2 + 60, height / 2 + 20, 'up_down')
            .setOrigin(0.5, 0.5)
            .setScale(1.5);

        this.add.text(width / 2 + 100, height / 2 + 10, 'or', {
            fontFamily: 'Days One',
            fontSize: '25px',
        });

        this.add
            .image(width / 2 + 180, height / 2 + 20, 'mouse')
            .setOrigin(0.5, 0.5)
            .setScale(1.5);

        // Display's the right menu
        this.add
            .text(width / 2, textHeight, 'Controllers', {
                fontSize: '80px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        new SpaceButton(
            this,
            'Menu',
            width / 2,
            buttonHeigh + gap * 3 - 10,
            0.7,
        )
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.scene.start('start-scene');
            });
    }

    update() {
        this._background.tilePositionX += background_menu_velocity;
    }
}
