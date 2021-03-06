/**
 * console.info
 * https://newdocs.phaser.io/docs/3.55.0/Phaser.Scenes.ScenePlugin#launch
 * Launch the given Scene and run it in parallel with this one
 * This will happen at the next Scene Manager update, not immediately.
 */
var SceneA = {
    key: 'SceneA',
    preload: function preload() {
        this.load.image('aqua_ball', 'assets/sprites/aqua_ball.png');
    },
    init: function init() {
        //  NOTE: Should yield `SceneB { ... }`, etc.
        console.info('SceneA init');
        console.log(this.scene.get('SceneB'));
        console.log(this.scene.get('SceneC'));
    },
    create: function create() {
        console.info('SceneA started.');
        // this.scene.launch('SceneB').launch('SceneC');
        this.scene.launch('SceneB');
    }
};
var SceneB = {
    key: 'SceneB',
    init: function init() {
        console.info('SceneB init.');
        setTimeout(() => {
            console.log(this.scene.get('SceneA'));
            console.log(this.scene.get('SceneB'));
            console.log(this.scene.get('SceneC'));
        }, 3000);
    },
    create: function create() {
        console.info('SceneB started.');
        this.scene.launch('SceneC')
    }
};
class SceneC extends Phaser.Scene {
    constructor() {
        super('SceneC');
    }
    create() {
        console.info('SceneC started.');
        this.add.image(160, 120, 'aqua_ball')
    }
}
var game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: [SceneA, SceneB, SceneC]
});
