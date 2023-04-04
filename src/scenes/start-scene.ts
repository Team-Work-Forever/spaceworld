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
                fontSize: '42px',
                fontFamily: 'Days One',
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(width / 2, textHeigh + 45, 'Peanuts War', {
                fontSize: '24px',
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
                this.scene.start('main-scene');
            });

        new SpaceButton(
            this,
            'High Score',
            width / 2,
            buttonHeigh + gap * 2,
            0.7,
        )
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {}, this);

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
                    this.scene.start('game_over-scene');
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

// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'phaser-example',
//     dom: {
//         createContainer: true,
//     },
//     scene: {
//         preload: preload,
//         create: create,
//     },
// };

// var element;

// var game = new Phaser.Game(config);

// function preload() {
//     this.load.html('nameform', 'assets/text/loginform.html');
//     this.load.image('pic', 'assets/pics/turkey-1985086.jpg');
// }

// function create() {
//     this.add.image(400, 300, 'pic');

//     var text = this.add.text(10, 10, 'Please login to play', {
//         color: 'white',
//         fontFamily: 'Arial',
//         fontSize: '32px ',
//     });

//     var element = this.add.dom(400, 600).createFromCache('nameform');

//     element.setPerspective(800);

//     element.addListener('click');

//     element.on('click', function (event) {
//         if (event.target.name === 'loginButton') {
//             var inputUsername = this.getChildByName('username');
//             var inputPassword = this.getChildByName('password');

//             //  Have they entered anything?
//             if (inputUsername.value !== '' && inputPassword.value !== '') {
//                 //  Turn off the click events
//                 this.removeListener('click');

//                 //  Tween the login form out
//                 this.scene.tweens.add({
//                     targets: element.rotate3d,
//                     x: 1,
//                     w: 90,
//                     duration: 3000,
//                     ease: 'Power3',
//                 });

//                 this.scene.tweens.add({
//                     targets: element,
//                     scaleX: 2,
//                     scaleY: 2,
//                     y: 700,
//                     duration: 3000,
//                     ease: 'Power3',
//                     onComplete: function () {
//                         element.setVisible(false);
//                     },
//                 });

//                 //  Populate the text with whatever they typed in as the username!
//                 text.setText('Welcome ' + inputUsername.value);
//             } else {
//                 //  Flash the prompt
//                 this.scene.tweens.add({
//                     targets: text,
//                     alpha: 0.1,
//                     duration: 200,
//                     ease: 'Power3',
//                     yoyo: true,
//                 });
//             }
//         }
//     });

//     this.tweens.add({
//         targets: element,
//         y: 300,
//         duration: 3000,
//         ease: 'Power3',
//     });
// }
