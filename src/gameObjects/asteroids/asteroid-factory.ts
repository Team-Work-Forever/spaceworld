import MainScene from "../../scenes/main-scene";
import BlueAsteroid from "./asteroids/blue-asteroid"
import YellowAsteroid from "./asteroids/yellow-asteroid";
import PurpleAsteroid from "./asteroids/purple-asteroid";

export class AsteroidFactory {
   
    private _main_scene: MainScene;

    constructor(main_scene: MainScene) {
        this._main_scene = main_scene;
    }

    createBlueAsteroid(x: number, y: number): BlueAsteroid {
        return new BlueAsteroid(this._main_scene, x, y);
    }

    createYellowAsteroid(x: number, y: number): YellowAsteroid {
        return new YellowAsteroid(this._main_scene, x, y);
    }

    createPurpleAsteroid(x: number, y: number): PurpleAsteroid {
        return new PurpleAsteroid(this._main_scene, x, y);
    }

}