import { DisplayStartMenu } from '../components';
import { background_velocity } from '../config';

export default class StartScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;

    constructor() {
        super('start-scene');
    }

    init() {}

    preload() {
        this.load.image('background', '../assets/background.png');
        this.load.image('spacebutton', '../assets/ui/space_button.png');

        // this.load.spritesheet('esteves', '../../assets/.png', {
        //     frameWidth: 209,
        //     frameHeight: 195,
        // });
    }

    create() {
        const { width, height } = this.scale;

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0);

        // Display's the right menu
        const display_menu = new DisplayStartMenu(this);

        // this.add.image(
        //     this.game.renderer.width / 2,
        //     this.game.renderer.height / 2,
        //     'background',
        // );

        // let playButton = this.add.image(
        //     this.game.renderer.width / 2,
        //     this.game.renderer.height / 2,
        //     'start_button',
        // );

        // let estevesSprite = this.add.sprite(
        //     this.game.renderer.width,
        //     this.game.renderer.height,
        //     'esteves',
        // );
        // estevesSprite.setScale(2);
        // estevesSprite.setVisible(true);

        // this.anims.create({
        //     key: "walk_and_jump",
        //     frames: this.anims.generateFrameNumbers('esteves', {
        //         start: 0,
        //         end: 10,
        //     }),
        //     frameRate: 8,
        //     repeat -1,
        // });
        //
        // estevesSprite.play("walk_and_jump");

        // playButton.setInteractive();

        // playButton.on('pointerdown', () => {
        //     this.scene.start('main-scene');
        // });
    }

    update() {
        this._background.tilePositionX += background_velocity;
    }
}

// this.scene.add('main-scene');
