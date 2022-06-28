/**
 * scene的各種type
 * https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Core.GameConfig
 * https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Scenes.CreateSceneFromObjectConfig
 * https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Scenes.SettingsConfig
 * 
 */
var sceneConfig = {
    preload: preload,
    create: create,
    // 此包含很多層type
    pack: {
        files: [
            { type: 'image', key: 'sonic', url: 'assets/sprites/sonic_havok_sanity.png' }
        ]
    }
};
var gameConfig = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: sceneConfig
};
var game = new Phaser.Game(gameConfig);

function preload() {
    this.load.image('face', 'assets/pics/bw-face.png');
}
function create() {
    this.add.image(400, 300, 'face');
    this.add.image(400, 300, 'sonic');
}