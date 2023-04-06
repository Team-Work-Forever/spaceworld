import { background_menu_velocity } from '../config';

export default class HistoryScene extends Phaser.Scene {
    private _background: Phaser.GameObjects.TileSprite;
    private image: Phaser.GameObjects.Image;
    private player: Phaser.Physics.Arcade.Sprite;
    private _weapon: Phaser.Physics.Arcade.Sprite;

    private x: number = 300;
    private y: number = 250;

    private _weapon_x: number = 5;
    private _weapon_y: number = 55;

    private _scale: number = 80;

    private _player: Phaser.GameObjects.Group;

    private lastClickTime: number = 0;
    private clickDelay: number = 200;

    private _countImage: number = 0;
    private images: string[] = [
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
        'image6',
        'image7',
        'image8',
        'image9',
    ];

    private _skip: Phaser.GameObjects.Text;

    constructor() {
        super('history-scene');
    }

    init() {
        this._countImage = 0;
    }

    create() {
        const { width, height } = this.scale;

        this._background = this.add
            .tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        this.set_animations();

        this._player = this.add.group();
        this.addPlayer();
        this.attach_weapon();
        this._player.add(this.player);
        this._player.add(this._weapon);

        this.image = this.add
            .image(width / 2, height / 2 + 100, this.images[this._countImage])
            .setOrigin(0.5, 0.5)
            .setScale(0.5);

        // Botão de Skip da História
        this._skip = this.add
            .text(width / 2 - 350, height / 2 + 75, 'Skip All', {
                fontFamily: 'Days One',
                fontSize: '25px',
                color: '#FC8F2B',
            })
            .setInteractive();

        this._skip.on('pointerdown', () => {
            this.scene.start('main-scene');
        });
    }

    addPlayer() {
        this.player = this.physics.add.sprite(this.x, this.y, 'player');
        this.physics.world.enableBody(this.player);

        this.player.displayHeight = this._scale;
        this.player.scaleX = this.player.scaleY;

        this.player.play('move');
    }

    attach_weapon() {
        this._weapon = this.physics.add.sprite(
            this.x + this._weapon_x,
            this.y + this._weapon_y,
            'weapon',
        );
        this.physics.world.enableBody(this._weapon);

        this._weapon.displayHeight = this._scale;
        this._weapon.scaleX = this._weapon.scaleY;
    }

    set_animations() {
        // Idle animation
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update() {
        // Background velocity
        this._background.tilePositionX += background_menu_velocity;

        // Listen for input and change image
        this.input.on('pointerdown', () => {
            const now = Date.now();
            if (now - this.lastClickTime > this.clickDelay) {
                // Check if it's the last image
                if (this._countImage === this.images.length - 1) {
                    this.scene.start('main-scene');
                } else {
                    this._countImage++;
                    this.image.setTexture(this.images[this._countImage]);
                }
                this.lastClickTime = now;
            }
        });
    }
}
