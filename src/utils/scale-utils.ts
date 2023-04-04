class Scale {
    public scaleTo(object: Phaser.GameObjects.Image, scale) {
        object.displayHeight = scale;
        object.scaleX = object.scaleY;
    }
}

export default new Scale();
