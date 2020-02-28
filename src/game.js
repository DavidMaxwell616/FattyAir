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

  // Make the ground body
  let groundBody = new Phaser.Physics.Box2D.Body(
    game,
    null,
    0,
    game.height / 2,
    0,
  );
  powerup1 = game.add.image(0, 0, 'powerup1');
  powerup2 = game.add.image(0, 0, 'powerup2');
  powerup3 = game.add.image(0, 0, 'powerup3');
  powerup4 = game.add.image(0, 0, 'powerup4');
  whiskey = game.add.image(0, 0, 'whiskey');
  shrooms = game.add.image(0, 0, 'shrooms');
  weed = game.add.image(0, 0, 'weed');
  snowball = game.add.image(0, 0, 'snowball');
  warning = game.add.image(0, 0, 'warning');
  powerup1.visible = false;
  powerup2.visible = false;
  powerup3.visible = false;
  powerup4.visible = false;
  whiskey.visible = false;
  shrooms.visible = false;
  weed.visible = false;
  snowball.visible = false;
  warning.visible = false;

  buildLevel();

  groundBody.setChain(vertices);
  let graphics = game.add.graphics(0, 0);

  for (let index = 0; index < vertices.length - 2; index += 2) {
    graphics.beginFill(0xeeeeee);
    graphics.lineStyle(1, 0xeeeeee, 1);
    graphics.moveTo(vertices[index], game.height / 2 + vertices[index + 1]);
    graphics.lineTo(vertices[index], game.height);
    graphics.lineTo(vertices[index + 2], game.height);
    graphics.lineTo(vertices[index + 2], game.height / 2 + vertices[index + 3]);
    graphics.lineTo(vertices[index], game.height / 2 + vertices[index + 1]);
    graphics.endFill();
  }

  let PTM = 70;



  // Make the john body
  johnBody = new Phaser.Physics.Box2D.Body(game, null, 60, 200);
  johnBody.setPolygon(johnVertices);
  upperjohn = game.add.sprite(0, 0, 'upperjohn');
  johnBody.sprite = upperjohn;
  lowerjohn = game.add.sprite(0, 0, 'lowerjohn');
  lowerjohn.visible = true;
  lowerjohn.anchor.setTo(0.6, 0.5);
  upperjohn.body = johnBody;
  upperjohn.visible = true;
  upperjohn.anchor.setTo(0.5, 1.2);

  upperjohn.body.setBodyContactCallback(groundBody, groundCallback, this);

  // Make the wheel bodies
  wheelBodies[0] = new Phaser.Physics.Box2D.Body(
    game,
    null,
    -0.82 * PTM,
    0.6 * -PTM,
  );
  wheelBodies[1] = new Phaser.Physics.Box2D.Body(
    game,
    null,
    1.05 * PTM,
    0.6 * -PTM,
  );
  wheelBodies[0].setCircle(0.3 * PTM);
  wheelBodies[1].setCircle(0.3 * PTM);

  let frequency = 3.5;
  let damping = 0.5;
  let motorTorque = 4;
  let rideHeight = 0.25;

  // Make wheel joints
  // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
  driveJoints[0] = game.physics.box2d.wheelJoint(
    johnBody,
    wheelBodies[0],
    -0.82 * PTM,
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
    johnBody,
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

  game.cursors = game.input.keyboard.createCursorKeys();
  game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  levelCaption = game.add.text(5, 5, 'Level: ' + level, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  scoreCaption = game.add.text(500, 5, 'Score: ' + score, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  livesCaption = game.add.text(900, 5, 'Lives: ' + lives, {
    fill: '#ffffff',
    font: '14pt Arial',
  });
  scoreCaption.fixedToCamera = true;
  levelCaption.fixedToCamera = true;
  livesCaption.fixedToCamera = true;
  background.fixedToCamera = true;
  game.camera.follow(johnBody);
}

function groundCallback() {
  isJumping = false;
}

function buildLevel() {
  let tnum = 0;
  let _l9 = 250;
  let _l2 = -200;
  let _l8 = 0;
  let _l1 = _l9 - 220;
  let _l7 = 0;
  let _l6 = 0;
  let _l5 = 0;
  let _l12 = 20;
  // tnm = "ter" + tnum;
  // ground.createEmptyMovieClip(tnm, tnum);
  // ground[tnm].clear();
  // ground[tnm].moveTo(_l2, _l9);
  // ground[tnm].beginFill(14540287);
  // ground[tnm].createEmptyMovieClip("objs", 1);
  // ground[tnm]._x = 15500 * tnum;
  // markerMC._rotation = bonusMC._rotation = ground._rotation = terrainang;
  let _l11 = 0;
  while (_l2 < worldWidth) {
    let _l3 = Math.floor(Math.random() * 100) + 50;
    if (_l6 > 0) {
      _l6--;
    } // end if
    _l12 = Math.cos(_l2 / 1000) * 20 + 25;
    if (_l6 > 0) {
      _l3 = _l3 + 110;
    } // end if
    if (Math.random() < level * 0.033 && _l7 == 0 && _l2 > 700 && _l6 == 0) {
      // let _l4 = "bldr" + _l5;
      // ground[tnm].objs.attachMovie("trackObjects", _l4, _l5);
      // ground[tnm].objs[_l4]._x = _l2;
      // ground[tnm].objs[_l4]._y = _l1 + 10;
      // ground[tnm].objs[_l4].gotoAndStop(10);

      _l5++;
      _l7 = Math.floor(Math.random() * 3) + 3;
      _l6 = _l7 + 5;
      _l1 = ohei - 40;
      _l3 = _l3 - 300;
    } // end if
    let _l10 = _l1;
    _l1 = _l1 + Math.sin(_l8) * _l3;
    _l8 = _l8 + (Math.random() * 1 - 0.5);
    if (_l7 > 0) {
      _l1 = _l9 + 300;
      _l7--;
    } else if (_l1 < 0) {
      _l1 = 0;
      _l8 = 0.1;
    } else if (_l1 > _l9 - 200) {
      _l1 = _l9 - 200;
      _l8 = -0.1;
    } // end if
    if (Math.floor(Math.random() * 10) > 5) {
      _l2 = _l2 + _l3;
      // ground[tnm].lineTo(_l2, _l1);
      vertices.push(_l2);
      vertices.push(_l1);
    } else {
      _l2 = _l2 + _l3;
      //  ground[tnm].curveTo(_l2 - _l3 / 2, _l10, _l2, _l1);
      vertices.push(_l2);
      vertices.push(_l1);
    } // end if
    // if (_l2 + ground[tnm]._x < 40000) {
    //   flagh = _l1;
    // } // end if
    if (
      Math.random() < level * 0.025 &&
      _l8 > -0.1 &&
      _l2 > 500 &&
      _l2 < 14000
    ) {
      // _l4 = "bldr" + _l5;
      // ground[tnm].objs.attachMovie("trackObjects", _l4, _l5);
      // ground[tnm].objs[_l4]._x = _l2;
      // ground[tnm].objs[_l4]._y = _l1 + 10;
      // ground[tnm].objs[_l4].gotoAndStop(Math.floor(Math.random() * 8) + 1);
      // _l5++;
      const bonusType = game.rnd.integerInRange(1, 4);
      switch (bonusType) {
        case 1:
          powerup1.reset(_l2, _l1 + 220);
          break;
        case 2:
          powerup2.reset(_l2, _l1 + 220);
          break;
        case 3:
          powerup3.reset(_l2, _l1 + 220);
          break;
        case 4:
          powerup4.reset(_l2, _l1 + 220);
          break;
        default:
          break;
      }
    } // end if
    if (_l11 % 45 == 20) {
      //      _l4 = "drop" + bonusCount;
      // bonusMC.attachMovie("bonusDrop", _l4, bonusCount);
      // bonusMC[_l4].gotoAndStop(random(10) + 1);
      // bonusMC[_l4]._x = _l2 + ground[tnm]._x;
      // bonusMC[_l4]._y = _l1 + 2;
      // bonusMC[_l4]._rotation = -terrainang;
      bonusCount++;
    } // end if
    _l11++;
    ohei = _l1;
  } // end while
  // ground[tnm].lineTo(_l2, _l9 + 400);
  // ground[tnm].lineTo(0, _l9 + 400);
  // ground[tnm].endFill();
  tnum++;
  lastGet = 0;
}

function update() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
  let motorSpeed = 50; // rad/s
  let motorEnabled = true;

  lowerjohn.x = driveJoints[1].x;
  lowerjohn.y = driveJoints[1].y;

  if (johnBody.y > game.world.height) {
    johnBody.x = 60;
    johnBody.y = 200;
    johnBody.velocity.x = 0;
    johnBody.velocity.y = 0;
    motorSpeed = 0;
  }

  if (game.cursors.down.isDown) {
    motorSpeed = 0;
  } // prioritize braking
  else if (game.cursors.left.isDown && !game.cursors.right.isDown) {
    motorSpeed *= -1;
  } else if (game.cursors.right.isDown && !game.cursors.left.isDown) {} else {
    motorEnabled = false;
  } // roll if no keys pressed
  if (game.spaceKey.isDown && !isJumping) {
    isJumping = true;
    johnBody.velocity.y = -200;
  }

  for (let i = 0; i < 2; i++) {
    driveJoints[i].EnableMotor(motorEnabled);
    driveJoints[i].SetMotorSpeed(motorSpeed);
  }
}

function render() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
  //game.debug.box2dWorld();
}