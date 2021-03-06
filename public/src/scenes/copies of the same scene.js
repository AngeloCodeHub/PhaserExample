var Controller = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Controller() {
        Phaser.Scene.call(this, { key: 'controller' });
    },
    preload: function () {
        this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
    },
    create: function () {
        var clone = 0;
        // https://newdocs.phaser.io/docs/3.55.0/Phaser.Time.Clock#addEvent
        // addEvent(config)
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                // https://newdocs.phaser.io/docs/3.55.0/Phaser.Scenes.ScenePlugin#add
                // add(key, sceneConfig, autoStart, [data])
                // Add the Scene into the Scene Manager and start it if 'autoStart' is true or the Scene config 'active' property is set.
                this.scene.add('demo' + clone, Demo, true);
                clone++;
            },
            callbackScope: this,
            repeat: 99
        });
    }
});
var Demo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Demo() {
        Phaser.Scene.call(this);
    },
    create: function () {
        this.eye = this.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'eye');
    },
    update: function () {
        this.eye.rotation += 0.02;
    }
});
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    // 沒有Demo，用add方法加入
    scene: [Controller]
};
var game = new Phaser.Game(config);
