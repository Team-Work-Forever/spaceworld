export default class Scale {
    public scaleTo(object: Phaser.Physics.Arcade.Sprite, scale) {
        object.displayHeight = scale;
        object.scaleX = object.scaleY;
    }
}
