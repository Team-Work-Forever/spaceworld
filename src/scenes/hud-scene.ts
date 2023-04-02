import { DisplayMenu } from '../components';

export default class HudScene extends Phaser.Scene {
    private displayMenu: DisplayMenu;

    constructor() {
        super('ui');
    }

    preload() {
        this.load.image('overlap-item', '../assets/overlap-item.png');
        this.load.image('energy_frame', '../assets/ui/energy_bar/frame.png');
        this.load.image(
            'energy_content',
            '../assets/ui/energy_bar/content.png',
        );

        this.load.spritesheet('icons', '../assets/ui/icons.png', {
            frameWidth: 18,
            frameHeight: 33,
        });

        this.load.spritesheet('heart', '../assets/ui/heart.png', {
            frameWidth: 49,
            frameHeight: 49,
        });
    }

    create() {
        this.displayMenu = new DisplayMenu(this);
        console.log('SLB!');
    }
}
