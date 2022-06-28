/**
 * 物件的寫法(原型)
 */
// 宣告一個MyGame物件
var MyGame = {};
// 宣告MyGame物件下一個方法函式Boot(本身也是物件)
MyGame.Boot = function () {
    // 事先宣告face
    this.face = null;
};
// MyGame.Boot這個物件賦予一個原型constructor方法函式
MyGame.Boot.prototype.constructor = MyGame.Boot;
// MyGame.Boot物件的原型只有一個constructor函式
// console.log(MyGame.Boot.prototype);
MyGame.Boot.prototype = {
    preload: function () {
        this.load.image('face', 'assets/pics/bw-face.png');
    },
    create: function () {
        this.face = this.add.image(400, 300, 'face');
        console.log(this);
    }
};
var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600
};
var game = new Phaser.Game(config);
game.scene.add('Boot', MyGame.Boot, true);