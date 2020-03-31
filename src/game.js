const game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
  preload,
  create,
  update,
  render,
});

function create() {
  if (!startGame) mainMenuCreate();
}

function gameCreate() {
  game.world.setBounds(0, 0, worldWidth, worldHeight);
  game.stage.backgroundColor = '#124184';

  // Enable Box2D physics
  game.physics.startSystem(Phaser.Physics.BOX2D);
  game.physics.box2d.gravity.y = 500;
  game.physics.box2d.friction = 0.8;

  snowball = new Phaser.Physics.Box2D.Body(game, null, 2000, 0);
  snowball.setCircle(39);
  sb = game.add.sprite(2000, 100, 'snowball');
  snowball.sprite = sb;
  sb.body = snowball;
  sb.anchor.setTo(0.5, 0.5);
  sb.body.velocity.x = 1000;
  snowball.setCollisionCategory(3); // this is a bitmask

  // Make the ground body
  groundBody = new Phaser.Physics.Box2D.Body(game, null, 0, game.height / 2, 0);
  bonus = game.add.sprite(0, 0, 'bonus');

  warning = game.add.image(0, 0, 'warning');

  snowball.visible = false;
  bonus.visible = false;
  warning.visible = false;
  graphics = game.add.graphics(0, 0);

  buildLevel();

  drawLevel();

  start = game.add.image(200, 200, 'start');
  start.anchor.setTo(0.5);
  finish = game.add.image(worldWidth - 200, 200, 'finish');

  leftButton = game.add.button(
    100,
    game.height - 40,
    'control',
    moveLeft,
    this,
  );
  leftButton.anchor.setTo(0.5);
  leftButton.scale.setTo(0.5);
  leftButton.angle = 180;
  rightButton = game.add.button(
    250,
    game.height - 40,
    'control',
    moveRight,
    this,
  );
  rightButton.scale.setTo(0.5);
  rightButton.anchor.setTo(0.5);
  upButton = game.add.button(700, game.height - 40, 'control', jump, this);
  upButton.scale.setTo(0.5);
  upButton.anchor.setTo(0.5);
  upButton.angle = 270;
  // Make the john body
  johnLegs = new Phaser.Physics.Box2D.Body(game, null, 60, 280);
  johnLegs.setPolygon(lowerJohnVertices);
  lowerjohn = game.add.sprite(0, 0, 'lowerjohn');
  lowerjohn.visible = true;
  lowerjohn.anchor.setTo(0.6, 0.5);
  lowerjohn.body = johnLegs;
  johnLegs.sprite = lowerjohn;

  johnBody = new Phaser.Physics.Box2D.Body(game, null, 60, 280);
  johnBody.setPolygon(upperJohnVertices);
  upperjohn = game.add.sprite(0, 0, 'upperjohn');
  johnBody.sprite = upperjohn;
  upperjohn.visible = true;
  upperjohn.anchor.setTo(0.5, 1.2);
  upperjohn.body = johnBody;

  game.physics.box2d.weldJoint(upperjohn, lowerjohn, 15, 30, 10, 20, 6, 0.5);
  // Make wheel joints
  // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
  // Make the wheel bodies
  wheelBodies[0] = new Phaser.Physics.Box2D.Body(
    game,
    null,
    johnLegs.x,
    johnLegs.y,
  );
  wheelBodies[1] = new Phaser.Physics.Box2D.Body(
    game,
    null,
    johnLegs.x,
    johnLegs.y,
  );
  wheelBodies[0].setCircle(0.3 * PTM);
  wheelBodies[1].setCircle(0.3 * PTM);
  driveJoints[0] = game.physics.box2d.wheelJoint(
    johnLegs,
    wheelBodies[0],
    -1.2 * PTM,
    rideHeight * PTM,
    0,
    0,
    0,
    1,
    frequency,
    damping,
    0,
    motorTorque,
    true,
  ); // rear
  driveJoints[1] = game.physics.box2d.wheelJoint(
    johnLegs,
    wheelBodies[1],
    1.05 * PTM,
    rideHeight * PTM,
    0,
    0,
    0,
    1,
    frequency,
    damping,
    0,
    motorTorque,
    true,
  ); // front
  groundBody.setCollisionCategory(1);
  wheelBodies[1].setCollisionCategory(1);

  wheelBodies[1].setCategoryContactCallback(1, groundCallback);
  wheelBodies[1].setCategoryContactCallback(2, callPowerup);

  game.cursors = game.input.keyboard.createCursorKeys();
  game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  levelText = game.add.text(5, 5, 'Level: ' + level, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  scoreText = game.add.text(350, 5, 'Score: ' + score, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  livesText = game.add.text(700, 5, 'Lives: ' + lives, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  scoreText.fixedToCamera = true;
  levelText.fixedToCamera = true;
  livesText.fixedToCamera = true;
  leftButton.fixedToCamera = true;
  rightButton.fixedToCamera = true;
  upButton.fixedToCamera = true;
  game.camera.follow(johnBody);
}

function groundCallback() {
  isJumping = false;
}

function drawLevel() {
  groundBody.setChain(vertices);
  game.physics.box2d.enable(groundBody, true);
  graphics.clear();
  for (let index = 0; index < vertices.length - 2; index += 2) {
    graphics.beginFill(0xeeeeee);
    graphics.lineStyle(1, 0xeeeeee, 1);
    graphics.moveTo(vertices[index], game.height / 2 + vertices[index + 1]);
    graphics.lineTo(vertices[index], game.height + 100);
    graphics.lineTo(vertices[index + 2], game.height + 100);
    graphics.lineTo(vertices[index + 2], game.height / 2 + vertices[index + 3]);
    graphics.lineTo(vertices[index], game.height / 2 + vertices[index + 1]);
    graphics.endFill();
  }
}

function buildLevel() {
  let tnum = 0;
  let _l9 = 250;
  let x = -200;
  let _l8 = 0;
  let y = _l9 - 220;
  let _l7 = 0;
  let _l6 = 0;
  let _l5 = 0;
  let _l12 = 20;
  // tnm = "ter" + tnum;
  // ground.createEmptyMovieClip(tnm, tnum);
  // ground[tnm].clear();
  // ground[tnm].moveTo(x, _l9);
  // ground[tnm].beginFill(14540287);
  // ground[tnm].createEmptyMovieClip("objs", 1);
  // ground[tnm].x = 15500 * tnum;
  // markerMC._rotation = bonusMC._rotation = ground._rotation = terrainang;
  let _l11 = 0;
  while (x < worldWidth) {
    let _l3 = Math.floor(Math.random() * 100) + 50;
    if (_l6 > 0) {
      _l6--;
    } // end if
    _l12 = Math.cos(x / 1000) * 20 + 25;
    if (_l6 > 0) {
      _l3 = _l3 + 110;
    } // end if
    if (Math.random() < level * 0.033 && _l7 == 0 && x > 700 && _l6 == 0) {
      // let _l4 = "bldr" + _l5;
      // ground[tnm].objs.attachMovie("trackObjects", _l4, _l5);
      // ground[tnm].objs[_l4].x = x;
      // ground[tnm].objs[_l4]._y =_y + 10;
      // ground[tnm].objs[_l4].gotoAndStop(10);

      _l5++;
      _l7 = Math.floor(Math.random() * 3) + 3;
      _l6 = _l7 + 5;
      y = ohei - 40;
      _l3 = _l3 - 300;
    } // end if
    let _l10 = y;
    y += Math.sin(_l8) * _l3;
    _l8 = _l8 + (Math.random() * 1 - 0.5);
    if (_l7 > 0) {
      y = _l9 + 300;
      _l7--;
    } else if (y < 0) {
      y = 0;
      _l8 = 0.1;
    } else if (y > _l9 - 200) {
      y = _l9 - 200;
      _l8 = -0.1;
    } // end if
    if (Math.floor(Math.random() * 10) > 5) {
      x = x + _l3;
      // ground[tnm].lineTo(x, _l1);
      vertices.push(x);
      vertices.push(y);
    } else {
      x = x + _l3;
      //  ground[tnm].curveTo(x - _l3 / 2, _l10, x, _l1);
      vertices.push(x);
      vertices.push(y);
    } // end if
    // if (x + ground[tnm].x < 40000) {
    //   flagh = y;
    // } // end if
    if (Math.random() < level * 0.025 && _l8 > -0.1 && x > 500 && x < 14000) {
      const bonusType = game.rnd.integerInRange(1, 4);
      var powerup = new Phaser.Physics.Box2D.Body(game, null, x, y + 220);
      powerup.setCircle(45);
      var pw = game.add.sprite(x, y + 220, 'powerups');
      powerup.frame = bonusType;
      powerup.sprite = pw;
      pw.body = powerup;
      pw.frame = bonusType;
      powerup.value = powerupScores[bonusType];
      pw.anchor.setTo(0.5, 0.5);
      powerup.setCollisionCategory(2); // this is a bitmask
      powerups.push(powerup);
    } // end if
    if (_l11 % 45 == 20) {
      const bonusType = game.rnd.integerInRange(1, 4);
      var bonus = new Phaser.Physics.Box2D.Body(game, null, x, y + 220);
      var bSprite = game.add.sprite(x, y + 220, 'bonus');
      bonus.setRectangle(bSprite.width, bSprite.height);
      bonus.frame = bonusType;
      bonus.sprite = bSprite;
      bSprite.body = powerup;
      bSprite.frame = bonusType;
      bonus.value = 1000;
      bSprite.anchor.setTo(0.5, 0.5);
      bonus.setCollisionCategory(2); // this is a bitmask
      bonuses.push(bonus);
      bonusCount++;
    } // end if
    _l11++;
    ohei = y;
  } // end while
  // ground[tnm].lineTo(x, _l9 + 400);
  // ground[tnm].lineTo(0, _l9 + 400);
  // ground[tnm].endFill();
  tnum++;
  lastGet = 0;
}

function updateStats() {
  levelText.setText('LEVEL: ' + level);
  scoreText.setText('SCORE: ' + score);
  livesText.setText('LIVES: ' + lives);
}

function callPowerup(body1, body2, fixture1, fixture2) {
  score += body2.value;
  if (body2.sprite != null) body2.sprite.visible = false;
  body2.destroy();
}

function moveLeft() {
  motorSpeed *= -1;
}

function moveRight() {}

function launchSnowball() {
  snowball.x = game.camera.x;
  snowball.y = 0;
  snowball.velocity.x = 500;
}

function jump() {
  //restartLevel();
  isJumping = true;
  johnBody.velocity.y = -200;
}

function update() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
  updateStats();

  scrollBackground();
  var rnd = Math.random();
  if (rnd < 0.001 && !snowball.visible) {
    snowball.visible = true;
    launchSnowball();
  }

  if (snowball.visible) {
    if (snowball.x > game.camera.width || snowball.y > game.camera.height)
      snowball.visible = false;
  }

  if (snowball.body != null) {
    snowball.body.velocity.x += 500;
    if (snowball.x > game.camera.width - 50) snowball.destroy();
  }

  lowerjohn.x = driveJoints[1].x;
  lowerjohn.y = driveJoints[1].y;
  motorSpeed = 50; // rad/s
  motorEnabled = true;
  if (johnBody.x > worldWidth - 100) {
    level++;
    restartLevel();
  }
  if (johnBody.x < 50) johnBody.velocity.x = 0;
  if (johnBody.y > game.world.height) {
    lives--;
    restartLevel();
  }
  if (game.cursors.down.isDown) {
    motorSpeed = 0;
  } // prioritize braking
  else if (game.cursors.left.isDown && !game.cursors.right.isDown) {
    moveLeft();
  } else if (game.cursors.right.isDown && !game.cursors.left.isDown) {
  } else {
    motorEnabled = false;
  } // roll if no keys pressed
  if (game.spaceKey.isDown) {
    jump();
  }
  for (let i = 0; i < 2; i++) {
    driveJoints[i].EnableMotor(motorEnabled);
    driveJoints[i].SetMotorSpeed(motorSpeed);
  }
}

function scrollBackground() {
  if (backgroundAPosition) {
    background.x = game.camera.x * 0.5;
    background2.x = background.x + background.width;
  } else {
    background2.x = game.camera.x * 0.5;
    background.x = background2.x + background2.width;
  }
  if (backgroundAPosition && background2.x < game.camera.x) {
    background.x = background2.x + background2.width;
    backgroundAPosition = false;
  }
  if (!backgroundAPosition && background.x < game.camera.x) {
    background2.x = background.x + background.width;
    backgroundAPosition = true;
  }
}

function restartLevel() {
  johnLegs.velocity.x = 0;
  johnBody.velocity.x = 0;
  johnLegs.velocity.y = 0;
  johnBody.velocity.y = 0;

  johnLegs.y = 280;
  johnLegs.x = 60;
  johnBody.y = 280;
  johnBody.x = 60;
  wheelBodies[0].y = 280;
  wheelBodies[0].x = 60;
  wheelBodies[1].y = 280;
  wheelBodies[1].x = 60;
  vertices = [];
  buildLevel();
  drawLevel();
}

function render() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
  // game.debug.box2dWorld();
}
