class SceneA extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneA' });
    }
    preload() {
        this.load.image('face', 'assets/pics/bw-face.png');
    }
    create() {
        this.face = this.add.image(400, 300, 'face');
        // 01-https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene#input
        // 02-https://newdocs.phaser.io/docs/3.55.2/Phaser.Input.InputPlugin#manager
        // 03-https://newdocs.phaser.io/docs/3.55.2/Phaser.Input.InputManager#enabled
        // this.input.manager.enabled = true;
        this.input.once('pointerdown', function () {
            this.scene.start('sceneB');
        }, this);
    }
}
class SceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneB' });
    }
    preload() {
        this.load.image('arrow', 'assets/sprites/longarrow.png');
    }
    create() {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);
        this.input.once('pointerdown', function (event) {
            this.scene.start('sceneC');
        }, this);
    }
    update() {
        this.arrow.rotation += 0.01;
    }
}
class SceneC extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneC' });
    }
    preload() {
        this.load.image('mech', 'assets/pics/titan-mech.png');
    }
    create() {
        this.add.sprite(Phaser.Math.Between(200, 700), 300, 'mech');
        this.input.once('pointerdown', function (event) {
            this.scene.start('sceneA');
        }, this);
    }
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    // scene要有載入才能start
    scene: [SceneA, SceneB, SceneC]
};
var game = new Phaser.Game(config);