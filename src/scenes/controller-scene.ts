import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';

export default class ControllerScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('controller-scene');
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
            .image(width / 2 + 125, height / 2 + 20, 'mouse')
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
