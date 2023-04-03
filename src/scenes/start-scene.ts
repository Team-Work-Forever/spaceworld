export default class StartScene extends Phaser.Scene {
    constructor() {
        super('start-scene');
    }

    init() {
        // Used to prepare data
    }

    preload() {
        this.load.spritesheet('esteves', '../../assets/.png', {
            frameWidth: 209,
            frameHeight: 195,
        });
    }

    create() {
        this.add.image(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            'background',
        );

        let playButton = this.add.image(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            'start_button',
        );

        let estevesSprite = this.add.sprite(
            this.game.renderer.width,
            this.game.renderer.height,
            'esteves',
        );
        estevesSprite.setScale(2);
        estevesSprite.setVisible(true);

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

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('main-scene');
        });
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
}

// this.scene.add('main-scene');
