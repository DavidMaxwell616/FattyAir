function mainMenuCreate() {
  background = game.add.image(0, 0, 'background');
  background.height = game.height;


  title = game.add.image(game.world.centerX, game.world.centerY, 'title');
  title.width = game.width / 2;
  title.height = game.height / 2;
  title.anchor.setTo(0.5, 0.5);
  title.visible = true;
  maxxdaddy = game.add.image(0, game.height * 0.95, 'maxxdaddy');

  //game.input.onDown.addOnce(startGame, this);
  game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function mainMenuUpdate() {
  if (game.spaceKey.isDown) {
    game.spaceKey = null;
    title.visible = false;
    gameCreate();
    startGame = true;
  }
}