function preload() {
  game.load.crossOrigin = 'anonymous';
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  game.load.image('title', 'assets/images/title.png');
  game.load.image('background', 'assets/images/background.png');
  game.load.image('john', 'assets/images/john.png');
  game.load.image('upperjohn', 'assets/images/upperjohn.png');
  game.load.image('lowerjohn', 'assets/images/lowerjohn.png');
  game.load.spritesheet('powerups', 'assets/images/powerups.png', 91, 91);
  game.load.image('snowball', 'assets/images/snowball.png');
  game.load.image('whiskey', 'assets/images/whiskey.png');
  game.load.image('shrooms', 'assets/images/shrooms.png');
  game.load.image('warning', 'assets/images/warning.png');
  game.load.image('weed', 'assets/images/weed.png');

  game.load.image('maxxdaddy', 'assets/images/maxxdaddy.gif');
}