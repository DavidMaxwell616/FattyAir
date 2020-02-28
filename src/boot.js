let title;
let startGame = false;
let maxxdaddy;
let level = 1;
let score = 0;
let lives = 3;
let scoreCaption;
let levelCaption;
let livesCaption;
const worldWidth = 15100;
const worldHeight = 640;
let isJumping = false;
let bonusCount = 0;
let vertices = [];
let powerup1;
let powerup2;
let powerup3;
let powerup4;
let whiskey;
let shrooms;
let weed;
let snowball;
let warning;

let wheelBodies = [];

let johnVertices = [
  -30, -15,
  -55, 2,
  -43, 14,
  54, 15,
  65, 3,
  79, 3,
  34, -15,
  11, -100,
  -5, -100
];

let johnBody;
let driveJoints = [];
let upperjohn;