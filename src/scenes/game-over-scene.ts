import SpaceButton from '../components/ui/space-button';
import { background_menu_velocity } from '../config';
import game from '../game';

export default class GameOverScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('game_over-scene');
    }

    init() {}

    preload() {
        this.load.image('spacebutton', '../assets/ui/space_button.png');
    }

    create() {
        const { width, height } = this.scale;

        const textHeigh = height / 2 - 200;
        const buttonHeigh = height / 2;
        const gap = 60;

        this.scene.stop('hud');

        // Display's the right menu
        this.add
            .text(width / 2, textHeigh, 'Game Over', {
                fontSize: '80px',
                fontFamily: 'Days One',
            })
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
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.switch('start-scene');
            });
    }

    update() {}
}
