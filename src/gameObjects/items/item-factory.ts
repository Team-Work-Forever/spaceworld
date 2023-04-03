import { MainScene } from '../../scenes';
import Item from './item';
import { ItemType } from './item-type';
import BlueCrystal from './items/blue-crystal';
import Heart from './items/heart';
import InvertCrystal from './items/invert-crystal';
import PurpleCrystal from './items/purple-crystal';
import YellowCrystal from './items/yellow-crystal';

type Prob = {
    probability: number;
};

export default class ItemFactory {
    private _main_scene: MainScene;
    private _probability: Prob[] = [
        {
            probability: 0.6,
        },
        {
            probability: 0.15,
        },
        {
            probability: 0.15,
        },
    ];

    constructor(main_scene: MainScene) {
        this._main_scene = main_scene;
    }

    createBlueCrystal(x: number, y: number): BlueCrystal {
        return new BlueCrystal(this._main_scene, x, y);
    }

    createYellowCrystal(x: number, y: number): YellowCrystal {
        return new YellowCrystal(this._main_scene, x, y);
    }

    createPurpleCrystal(x: number, y: number): PurpleCrystal {
        return new PurpleCrystal(this._main_scene, x, y);
    }

    createInvertCrystal(x: number, y: number): InvertCrystal {
        return new InvertCrystal(this._main_scene, x, y);
    }

    createHeart(x: number, y: number): Heart {
        return new Heart(this._main_scene, x, y);
    }

    createRandom(
        x: number,
        y: number,
        itemType: ItemType,
        is_heart: boolean,
    ): Item {
        const random = Math.random();

        let sum = 0;

        for (let i = 0; i < this._probability.length; i++) {
            sum += this._probability[i].probability;

            if (random < sum) {
                switch (i) {
                    case 0:
                        return this.createNormalCrystal(itemType, x, y);
                    case 1:
                        if (is_heart) return this.createHeart(x, y);
                        return this.createNormalCrystal(itemType, x, y);
                    case 2:
                        return this.createInvertCrystal(x, y);
                }
            }
        }

        return this.createNormalCrystal(itemType, x, y);
    }

    private createNormalCrystal(itemType: ItemType, x: number, y: number) {
        let item: Item = undefined;

        switch (itemType) {
            case ItemType.YELLOW:
                item = this.createYellowCrystal(x, y);
                break;
            case ItemType.BLUE:
                item = this.createBlueCrystal(x, y);
                break;
            case ItemType.PURPLE:
                item = this.createPurpleCrystal(x, y);
                break;
        }

        return item;
    }
}
