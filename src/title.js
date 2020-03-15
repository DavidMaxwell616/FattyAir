function mainMenuCreate() {
  background = game.add.image(0, 0, 'background');
  background.height = game.height + 300;
  background2 = game.add.image(0, 0, 'background');
  background2.height = game.height + 300;
  background2.x = background.x + background.width;

  title2 = game.add.image(game.world.centerX - 5, game.world.centerY + 5, 'title');

  title2.anchor.setTo(0.5, 0.5);
  title2.visible = true;
  title2.tint = Math.random() * 0x222222;
  title = game.add.image(game.world.centerX, game.world.centerY, 'title');

  title.anchor.setTo(0.5, 0.5);
  title.visible = true;
  maxxdaddy = game.add.image(0, game.height * 0.95, 'maxxdaddy');

   game.input.onDown.addOnce(fireStart, this);
  game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function mainMenuUpdate() {
  if (game.spaceKey.isDown) {
  
      fireStart();
  }
}

function fireStart(){
    game.spaceKey = null;
    title.visible = false;
    title2.visible = false;
    gameCreate();
    startGame = true;

}