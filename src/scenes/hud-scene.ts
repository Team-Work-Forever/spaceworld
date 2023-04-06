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
        this.game_scene.events.on('addScore', this.add_points, this);
        this.game_scene.events.on('hitPlayer', this.hitPlayer, this);
        this.game_scene.events.on('catchLife', this.incrementLife, this);
        this.game_scene.events.on('energyChanged', this.energyChanged, this);
        this.game_scene.events.on('shieldChanged', this.shieldChanged, this);
        this.game_scene.events.on('updateLevel', this.updateLevel, this);
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

    incrementLife(lifes: number) {
        this.displayMenu.increaseLife(lifes);
    }

    hitPlayer(lifes: number) {
        this.displayMenu.decreaseLife(lifes);
    }

    add_points(itemType: ItemType, score?: number) {
        this.displayMenu.increaseScore(itemType, score);
        this.game_scene.total_score = this.displayMenu.getSumScore();
    }
}
