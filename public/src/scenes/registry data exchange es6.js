/**
 * 1.https://newdocs.phaser.io/docs/3.55.0/Phaser.Scene#registry
 * 2.https://newdocs.phaser.io/docs/3.55.0/Phaser.Data.DataManager#events
 * 3.https://newdocs.phaser.io/docs/3.55.0/Phaser.Events.EventEmitter#on
 * 修正原作的bug
 */
class SceneA extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
        this.lives = 6;
    }
    preload() {
        this.load.image('bg', 'assets/skies/sky4.png');
        this.load.image('crate', 'assets/sprites/crate.png');
    }
    create() {
        //  Store the score and lives in the Game Registry
        this.registry.set('score', this.score);
        this.registry.set('lives', this.lives);
        this.add.image(400, 300, 'bg');
        for (let i = 0; i < 64; i++) {
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
            let box = this.add.image(x, y, 'crate').setInteractive();
            if (i % 2) {
                box.setTint(0xff0000);
            }
        }
        // 如何找出Event的callback函式定義
        // Namespace: Events > Phaser.Input.Events
        // Phaser.Input.Events.GAMEOBJECT_UP
        this.input.on('gameobjectup', this.clickHandler, this);
    }
    // 
    clickHandler(pointer, box) {
        // clickHandler(box_1, pointer) {
        if (this.lives === 0) {
            return;
        }
        //  Disable our box
        box.input.enabled = false;
        box.setVisible(false);
        //  If the box was tinted red, you lose a life
        // 255無效
        // if (box.tintTopLeft == 255) {
        if (box.tintTopLeft === 0xff0000) {
            this.lives--;
            this.registry.set('lives', this.lives);
        }
        else {
            this.score++;
            this.registry.set('score', this.score);
        }
    }
}
class SceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
        this.scoreText;
        this.livesText;
    }
    create() {
        //  Our Text object to display the Score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', fill: '#000000' });
        this.livesText = this.add.text(10, 48, 'Lives: 6', { font: '32px Arial', fill: '#000000' });
        //  Check the Registry and hit our callback every time the 'score' value is updated
        // Namespace: Phaser.Data
        this.registry.events.on('changedata', this.updateData, this);
    }
    updateData(parent, key, data) {
        // updateData(key, data) {
        if (key === 'score') {
            this.scoreText.setText('Score: ' + data);
        }
        else if (key === 'lives') {
            this.livesText.setText('Lives: ' + data);
        }
    }
}
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [SceneA, SceneB]
};
let game = new Phaser.Game(config);
