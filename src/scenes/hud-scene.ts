import { DisplayMenu } from '../components';
import { ItemType } from '../gameObjects/items/item-type';
import MainScene from './main-scene';

export default class HudScene extends Phaser.Scene {
    private displayMenu: DisplayMenu;
    private game_scene: MainScene;

    constructor() {
        super('hud');
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
        // Display HUD
        this.displayMenu = new DisplayMenu(this);
        this.game_scene = this.scene.get('main-scene') as MainScene;

        // Events
        this.game_scene.events.on('addScore', this.add_points, this);
        this.game_scene.events.on('hitPlayer', this.hitPlayer, this);
        this.game_scene.events.on('catchLife', this.incrementLife, this);
        this.game_scene.events.on('energyChanged', this.energyChanged, this);
        this.game_scene.events.on('shieldChanged', this.shieldChanged, this);
        this.game_scene.events.on('updateLevel', this.updateLevel, this);
    }

    updateLevel(level: number) {
        this.displayMenu.updateLevel(level);
        // console.log('HALLAND 6');
    }

    shieldChanged(number: number, is_active: boolean) {
        this.displayMenu.updateShield(number, is_active);
        // console.log('HALLAND 5');
    }

    energyChanged(number: number, permission: boolean = false) {
        this.displayMenu.updateEnergy(number, permission);
        // console.log('HALLAND 4');
    }

    incrementLife(lifes: number) {
        this.displayMenu.increaseLife(lifes);
        console.log('HALLAND 3');
    }

    hitPlayer(lifes: number) {
        this.displayMenu.decreaseLife(lifes);
        console.log('HALLAND 2');
    }

    add_points(itemType: ItemType, score?: number) {
        this.displayMenu.increaseScore(itemType, score);
        this.game_scene.total_score = this.displayMenu.getSumScore();
        console.log('HALLAND 1');
    }
}
