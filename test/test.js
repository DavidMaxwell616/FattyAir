const game = new Phaser.Game(1000, 640, Phaser.CANVAS, 'game', {
  preload,
  create,
  update
});

function preload() {}

function create() {
  vertices = johnVertices;
  game.stage.backgroundColor = '#124184';
  let graphics = game.add.graphics(0, 0);
  graphics.lineStyle(1, 0xFFFFFF, 1);
  console.log(game.world.centerX + vertices[0]);
  graphics.moveTo(game.world.centerX + vertices[0], game.world.centerY + vertices[1]);
  for (let index = 2; index < vertices.length - 1; index += 2) {
    graphics.lineTo(game.world.centerX + vertices[index], game.world.centerY + vertices[index + 1]);
  }
}

function update() {}