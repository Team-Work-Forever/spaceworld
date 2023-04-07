import { audioManager } from '../game';

export default class LoadScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('spacebutton', 'assets/ui/space_button.png');
        this.load.image('space', 'assets/comands/space_button.png');
        this.load.image('up_down', 'assets/comands/up_down_keys.png');
        this.load.image('mouse', 'assets/comands/mouse.png');

        this.load.image('image1', 'assets/history/image1.png');
        this.load.image('image2', 'assets/history/image2.png');
        this.load.image('image3', 'assets/history/image3.png');
        this.load.image('image4', 'assets/history/image4.png');
        this.load.image('image5', 'assets/history/image5.png');
        this.load.image('image6', 'assets/history/image6.png');
        this.load.image('image7', 'assets/history/image7.png');
        this.load.image('image8', 'assets/history/image8.png');
        this.load.image('image9', 'assets/history/image9.png');

        this.load.image('overlap-item', 'assets/overlap-item.png');
        this.load.image('energy_frame', 'assets/ui/energy_bar/frame.png');
        this.load.image('energy_content', 'assets/ui/energy_bar/content.png');
        this.load.image('bullet', 'assets/bullet.png');

        this.load.spritesheet('icons', 'assets/ui/icons.png', {
            frameWidth: 18,
            frameHeight: 33,
        });

        this.load.spritesheet('heart', 'assets/ui/heart.png', {
            frameWidth: 49,
            frameHeight: 49,
        });

        this.load.spritesheet(
            'thats_how_we_roll',
            'assets/ui/spining_esteves.png',
            {
                frameWidth: 209,
                frameHeight: 195,
            },
        );

        this.load.spritesheet('player', 'assets/sprite_nave.png', {
            frameWidth: 346.14,
            frameHeight: 100,
        });
        this.load.spritesheet('weapon', 'assets/weapon.png', {
            frameWidth: 217,
            frameHeight: 102,
        });

        this.load.spritesheet('item', 'assets/item.png', {
            frameWidth: 18.25,
            frameHeight: 33,
        });
        this.load.spritesheet('items', 'assets/items-menu.png', {
            frameWidth: 57,
            frameHeight: 98,
        });
        this.load.spritesheet('blue_asteroid', 'assets/blue_asteroid.png', {
            frameWidth: 101.98,
            frameHeight: 100,
        });
        this.load.spritesheet(
            'purple_asteroid',
            'assets/asteroid_purple_sprite.png',
            { frameWidth: 125.9, frameHeight: 59 },
        );
        this.load.spritesheet(
            'yellow_asteroid',
            'assets/yellow_asteroid_sprite.png',
            { frameWidth: 112, frameHeight: 53 },
        );
        this.load.spritesheet('player', 'assets/sprite_nave.png', {
            frameWidth: 346.14,
            frameHeight: 100,
        });
        this.load.spritesheet('weapon', 'assets/weapon.png', {
            frameWidth: 217,
            frameHeight: 102,
        });
        this.load.image('shield', 'assets/shield.png');

        this.load.spritesheet('esteves-adv', 'assets/ui/steves_adv.png', {
            frameWidth: 242,
            frameHeight: 211,
        });

        this.load.audio('laser-sound', ['assets/sounds/laser.mp3']);
        this.load.audio('esteves-damage', ['assets/sounds/estevesdamage.mp3']);
        this.load.audio('destroy-asteroid', [
            'assets/sounds/destroyasteroid.mp3',
        ]);
        this.load.audio('esteves-destroy', [
            'assets/sounds/estevesdestroy.mp3',
        ]);
        this.load.audio('counter', ['assets/sounds/counter1.mp3']);
        this.load.audio('counter-start', ['assets/sounds/counter2.mp3']);
        this.load.audio('reload-weapon', ['assets/sounds/reload.mp3']);

        this.load.audio('gameover-sound', ['assets/sounds/gameover.mp3']);
        this.load.audio('high-score', ['assets/sounds/highscore.mp3']);
        this.load.audio('overheat', 'assets/sounds/overheat.mp3');
        this.load.audio('background-audio', 'assets/sounds/background.mp3');
    }

    create() {
        audioManager.setUpAllSounds();
        audioManager.setUpBackgroundMusic();
        this.scene.start('start-scene');
    }
}
