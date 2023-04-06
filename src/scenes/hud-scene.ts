import { DisplayMenu } from '../components';
import { ItemType } from '../gameObjects/items/item-type';
import MainScene from './main-scene';

export default class HudScene extends Phaser.Scene {
    private displayMenu: DisplayMenu;
    private game_scene: MainScene;

    constructor() {
        super('hud');
    }

    create() {
        // Display HUD
        this.displayMenu = new DisplayMenu(this);
        this.game_scene = this.scene.get('main-scene') as MainScene;

        // Events
        this.game_scene.events.on('energyChanged', this.energyChanged, this);
        this.game_scene.events.on('shieldChanged', this.shieldChanged, this);
        this.game_scene.events.on('updateLevel', this.updateLevel, this);
        this.game_scene.events.on('displayScore', this.displayScore, this);
        this.game_scene.events.on('displayLifes', this.displayLifes, this);
    }

    updateLevel(level: number) {
        this.displayMenu.updateLevel(level);
    }

    shieldChanged(number: number, is_active: boolean) {
        this.displayMenu.updateShield(number, is_active);
    }

    energyChanged(number: number, permission: boolean = false) {
        this.displayMenu.updateEnergy(number, permission);
    }

    displayLifes(lifes: number) {
        this.displayMenu.displayLifes(lifes);
    }

    displayScore(itemType: ItemType, score: number) {
        this.displayMenu.displayScore(itemType, score);
    }
}
