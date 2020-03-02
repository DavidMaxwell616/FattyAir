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
let isJumping = true;
let bonusCount = 0;
let vertices = [];
let powerups;
let whiskey;
let shrooms;
let weed;
let snowball;
let warning;
let frequency = 3.5;
let damping = 0.5;
let motorTorque = 4;
let rideHeight = 0.25;
let rewards = [];
const PTM = 70;


let wheelBodies = [];

const lowerJohnVertices = [
  -30, -30,
  -105, 2,
  -103, 14,
  54, 15,
  65, 3,
  0, -30,
];

const upperJohnVertices = [
  -20, -15,
  -20, -80,
  -8, -115,
  11, -115,
  22, -55,
  14, -15,
]

let johnBody;
let johnLegs;
let driveJoints = [];
let upperjohn;