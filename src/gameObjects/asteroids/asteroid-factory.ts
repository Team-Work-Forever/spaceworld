import MainScene from '../../scenes/main-scene';
import BlueAsteroid from './asteroids/blue-asteroid';
import YellowAsteroid from './asteroids/yellow-asteroid';
import PurpleAsteroid from './asteroids/purple-asteroid';
import { Asteroid } from './asteroid';

type Prob = {
    probability: number;
};

export class AsteroidFactory {
    private _main_scene: MainScene;
    private _probability: Prob[] = [
        {
            probability: 0.33, // Asteroid Blue
        },
        {
            probability: 0.33, // Asteroid Yellow
        },
        {
            probability: 0.33, // Asteroid Purple
        },
    ];

    constructor(main_scene: MainScene) {
        this._main_scene = main_scene;
    }

    public createBlueAsteroid(x: number, y: number): BlueAsteroid {
        return new BlueAsteroid(this._main_scene, x, y);
    }

    public createYellowAsteroid(x: number, y: number): YellowAsteroid {
        return new YellowAsteroid(this._main_scene, x, y);
    }

    public createPurpleAsteroid(x: number, y: number): PurpleAsteroid {
        return new PurpleAsteroid(this._main_scene, x, y);
    }

    public createRandom(x: number, y: number): Asteroid {
        const random = Math.random();

        let sum = 0;

        for (let i = 0; i < this._probability.length; i++) {
            sum += this._probability[i].probability;

            if (random < sum) {
                switch (i) {
                    case 0:
                        return this.createBlueAsteroid(x, y);
                    case 1:
                        return this.createYellowAsteroid(x, y);
                    case 2:
                        return this.createPurpleAsteroid(x, y);
                }
            }
        }

        // Se der erro é capaz ser isto
        return this.createRandom(x, y);
    }
}
