import game from "../game";

export default class Align {

    static scaleToGameW(obj, per) {
        obj.displayWidth = parseInt(game.config.width.toString()) * per;
        obj.scaleY = obj.scaleX;
    }

    static centerH(obj) {
        obj.x = parseInt(game.config.width.toString()) / 2 - 2 - obj.displayWidth / 2;
    }

    static centerV(obj) {
        obj.y = parseInt(game.config.height.toString()) / 2 - obj.displayHeight / 2;
    }

    static center2(obj) {
        obj.x = parseInt(game.config.width.toString()) / 2 - 2 - obj.displayWidth / 2;
        obj.y = parseInt(game.config.height.toString()) / 2 - obj.displayHeight / 2;
    }

}