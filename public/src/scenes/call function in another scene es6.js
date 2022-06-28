class SceneA extends Phaser.Scene {
    constructor() {
        // super('MyFirstScene');
        super();
    }
    preload() {
        this.load.image('asuna', 'assets/sprites/asuna_by_vali233.png');
    }
    create() {
        this.input.on('pointerup', this.clickHandler, this);
        this.add.text(10, 10, 'Click to get image', { font: '16px Courier', fill: '#00ff00' }).setDepth(1000);
    }
    clickHandler() {
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Scenes.ScenePlugin#get
        // Retrieve a Scene.
        let sceneB = this.scene.get('MySecondScene');
        // 呼叫SceneB的getPosition
        let position = sceneB.getPosition();
        console.log(position)
        this.add.image(position.x, position.y, 'asuna');
    }
}
class SceneB extends Phaser.Scene {
    constructor() {
        super('MySecondScene');
    }
    getPosition() {
        let x = Phaser.Math.Between(0, 800);
        let y = Phaser.Math.Between(0, 600);
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Math.Vector2
        // 建立與維護一個2D維度
        return new Phaser.Math.Vector2(x, y);
    }
}
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [SceneA, SceneB]
};
let game = new Phaser.Game(config);
