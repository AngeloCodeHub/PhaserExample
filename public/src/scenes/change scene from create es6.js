/**
 * 每個scene有自己的作用域
 * sceneD沒有preload，如果沒start呼叫的話不起作用
 * start：Shutdown this Scene and run the given one.
 * shutdown之後sceneA的preload資料會留著
 */
class SceneA extends Phaser.Scene {
    constructor() {
        super('sceneA');
    }
    preload() {
        this.load.image('face', 'assets/pics/bw-face.png');
        this.load.image('arrow', 'assets/sprites/longarrow.png');
    }
    create() {
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene#scene
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Scenes.ScenePlugin#start
        this.scene.start('sceneB');
        // shutdown之後以下無法作用
        this.time.delayedCall(2000, () => {
            console.log("此scene shutdwon~~~")
        }, this)
    }
}
class SceneB extends Phaser.Scene {
    constructor() {
        super('sceneB');
    }
    create() {
        this.scene.start('sceneC');
    }
}
class SceneC extends Phaser.Scene {
    constructor() {
        super('sceneC');
    }
    create() {
        this.scene.start('sceneD');
    }
}
class SceneD extends Phaser.Scene {
    constructor() {
        super('sceneD');
    }
    create() {
        this.face = this.add.image(400, 300, 'face');
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);
    }
    update() {
        this.arrow.rotation += 0.01;
    }
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [SceneA, SceneB, SceneC, SceneD]
};
var game = new Phaser.Game(config);
