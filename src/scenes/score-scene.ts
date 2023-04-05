import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';

export default class ScoreScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('score-scene');
    }

    preload() {
        this.load.image('background', '../assets/background.png');
        this.load.image('spacebutton', '../assets/ui/space_button.png');
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
        this.add
            .text(width / 2, height / 2 - 80, `1. \t\t\t\b 400 Points`, {
                fontFamily: 'Days One',
                fontSize: '44px',
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(width / 2, height / 2 - 65 + gap, `2. \t\t\t\b 350 Points`, {
                fontFamily: 'Days One',
                fontSize: '38px',
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(
                width / 2,
                height / 2 - 65 + gap * 2,
                `3. \t\t\t\b 300 Points`,
                {
                    fontFamily: 'Days One',
                    fontSize: '34px',
                },
            )
            .setOrigin(0.5, 0.5);

        this.add
            .text(
                width / 2,
                height / 2 - 65 + gap * 3,
                `4. \t\t\t\b 250 Points`,
                {
                    fontFamily: 'Days One',
                    fontSize: '28px',
                },
            )
            .setOrigin(0.5, 0.5);

        this.add
            .text(
                width / 2,
                height / 2 - 65 + gap * 4,
                `5. \t\t\t\b 10 Points`,
                {
                    fontFamily: 'Days One',
                    fontSize: '24px',
                },
            )
            .setOrigin(0.5, 0.5);

        // Display's the right menu
        this.add
            .text(width / 2, textHeight, 'Scores', {
                fontSize: '80px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        new SpaceButton(
            this,
            'Menu',
            width / 2,
            buttonHeigh + gap * 5 - 10,
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
