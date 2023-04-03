import { DisplayMenu } from '../components';
import { ItemType } from '../gameObjects/items/item-type';
import MainScene from './main-scene';

export default class HudScene extends Phaser.Scene {
    private displayMenu: DisplayMenu;
    private game_scene: MainScene;

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
        this.game_scene = this.scene.get('main-scene') as MainScene;

        this.game_scene.events.on('addScore', this.add_points, this);
        this.game_scene.events.on('hitPlayer', this.hitPlayer, this);
        this.game_scene.events.on('catchLife', this.incrementLife, this);
        this.game_scene.events.on('energyChanged', this.energyChanged, this);
    }

    energyChanged(number: number) {
        this.displayMenu.updateEnergy(number);
    }

    incrementLife(lifes: number) {
        this.displayMenu.increaseLife(lifes);
    }

    hitPlayer(lifes: number) {
        this.displayMenu.decreaseLife(lifes);
    }

    add_points(itemType: ItemType, score?: number) {
        this.displayMenu.increaseScore(itemType, score);
    }
}
