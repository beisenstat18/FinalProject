/asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

//create global variabless
var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;
var time=15;
var begin;
var duration=15;
var xlocation=random(0,800);
var ylocation=random(0,600);

function setup() {
  createCanvas(800, 600);
  background(0);
  //load images
  begin=millis();
  bulletImage = loadImage('greta.png');  
  shipImage = loadImage('turtle.png');
  particleImage = loadImage('duffcan.png');
  // create turtle sprite in middle of screen
  ship = createSprite(width/2, height/2);
  ship.maxSpeed = 6;
  ship.friction = 0.98;
  // make nothing touch the turtle for a circle with radius of 20
  ship.setCollider('circle', 0, 0, 20);
  // add turtle image to sprite variable
  ship.addImage('normal', shipImage);
 // ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');
  // create groups for greta bullets and duff can asteroids
  asteroids = new Group();
  bullets = new Group();
// make the duff cans rotate and _____
  for(var i = 0; i<8; i++) {
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2+ 1000 * sin(radians(ang));
    createAsteroid(3, px, py);
  }
}

function draw() {
  background(0);
  fill(255);
  // write the instructions within the code in the center 
  textAlign(CENTER);
  text('Controls: Arrow Keys + X', width/2, 20);
// go through list of sprites 
  for(var i=0; i<allSprites.length; i++) {
    // at each sprite, make sure the sprite doesn't go beyond margin
    var s = allSprites[i];
    if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
  // 
  asteroids.overlap(bullets, asteroidHit); //when asteroids overlap with bullets, asteroid Hit happens

  ship.bounce(asteroids); //turtle does bouncing whatever that is with duff cans
// change this to change the greta movements
  if(keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if(keyDown(UP_ARROW))
  {
 //   ship.addSpeed(0.2, ship.rotation);
  //  ship.changeAnimation('thrust'); //unnecessary, no thrusting involved 
    //maybe change up and down so that greta doesn't just rotate, she moves?
  }
//  else //this is extra because no thrust necessary
 //   ship.changeAnimation('normal');

  if(keyWentDown('x'))
  {
    var bullet = createSprite(ship.position.x, ship.position.y); //change position of bullet so it leaves turtles face, not our of turtle, more like shooting
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30; //make sure a bunch of gretas don't linger. after 30 draw cycles removed
    bullets.add(bullet); 
  }

  drawSprites();
  
  if (time> 0){
    time=duration-(millis()-begin)/1000;
    text(time,width/2,30)
  }
  
  if (time<0){
    text('YOU LOSE. NO ONE PERSON CAN SAVE THE ENVIRONMENT.COME TOGETHER TO WIN.', width/2, height/2);
    image(asteroids,xlocation,ylocation);
  }

}

function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img = loadImage('duffcan.png');
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = 0.5;
  //a.debug = true;
  // this is the stuff that replicates the duff can. get rid of this so can goes away entirely
  a.type = type;

  if(type == 2)
    a.scale = 0.6;
  // if(type == 1)
  //   a.scale = 0.3;

  a.mass = 2+a.scale;
  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
  var newType = asteroid.type-1;

  if(newType>0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  //  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

  for(var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(bulletImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.95;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
}



