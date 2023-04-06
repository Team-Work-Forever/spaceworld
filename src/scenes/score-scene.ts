import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';
import gameStorage from '../services/game-storage';

export default class ScoreScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;
    private _max_points: number = 5;

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
            .text(width / 2, textHeight, 'Scores', {
                fontSize: '80px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        this.draw(width, height, gameStorage.getAll());

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

    private draw(width: number, height: number, values: number[]) {
        const gap = 60;
        const initial_letter_size = 44;
        const decrease_letter_size = 4;

        for (let i = 0; i < this._max_points; i++) {
            this.add
                .text(
                    width / 2,
                    height / 2 - 65 + gap * i,
                    `${i + 1}. \t\t\t\b ${values[i]} Points`,
                    {
                        fontFamily: 'Days One',
                        fontSize: `${
                            initial_letter_size - decrease_letter_size * i
                        }px`,
                    },
                )
                .setOrigin(0.5, 0.5);
        }
    }

    update() {
        this._background.tilePositionX += background_menu_velocity;
    }
}
