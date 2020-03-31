var text;

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
  game.load.image('snowball', 'assets/images/snowball.png');
  game.load.spritesheet('powerups', 'assets/images/powerups.png', 91, 91);
  game.load.spritesheet('bonus', 'assets/images/bonus.png', 75, 100);
  game.load.image('warning', 'assets/images/warning.png');
  game.load.image('start', 'assets/images/start.png');
  game.load.image('finish', 'assets/images/finish.png');
  game.load.image('control', 'assets/images/green-arrow.png');

  game.load.image('maxxdaddy', 'assets/images/maxxdaddy.gif');

  game.load.onLoadStart.add(loadStart, this);
  game.load.onLoadComplete.add(loadComplete, this);
  text = game.add.text(32, 32, '', {
    fill: '#ffffff'
  });
}

function loadStart() {

  text.setText("Loading ...");

}

function loadComplete() {

  text.setText("Load Complete");

}