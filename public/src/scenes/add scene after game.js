/**
 * 先產生game instance，再加入scene
 * 使用SceneManager
 */
class MyScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        console.log(config);
        console.log("此config是空的，與下面的game config不一樣");
    }
    preload() {
        this.load.image('face', 'assets/pics/bw-face.png');
    }
    create(data1) {
        this.face = this.add.image(data1.x, data1.y, 'face');
    }
}
var config = {
    // 此物件沒有指定scene
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600
};
// console.log(config);
var game = new Phaser.Game(config);
console.log(config);
// Phaser.Game類別下的scene member
// https://newdocs.phaser.io/docs/3.55.2/Phaser.Game#scene
// https://newdocs.phaser.io/docs/3.55.2/Phaser.Scenes.SceneManager#add
// add(key, sceneConfig, [autoStart], [data])
// game.scene交由SceneManager類別管理
game.scene.add('myScene', MyScene, true, {
    // 自定義物件x,y給create用
    x: 400, y: 300
});