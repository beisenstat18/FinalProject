//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

//create global variables
var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 10;
var time=15;
var begin;
var duration=15;
var level=1;
var happybackground;
var y=0;
var x=200;
var size1=0;
var size2=0;
var placex;
var placey;
var torah; 
var rot=2;
var dark;
var row;
var column=0;
var timesused=0;
let myBoolean;

// var xlocation=random(0,800);
// var ylocation=random(0,600);
function preload(){
	seed=loadImage('fishhead.png');
	happybackground=loadImage('background.png');
	dark=loadImage('darkbackground.png');
	initial=loadImage('plastic-bottles-750.jpg');
	theFont=loadFont('FindetNemo-KVxD.ttf');
	//backgroundsound=loadSound('background.wav');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
	background(0);
	//load images
	bulletImage = loadImage('candy.png');  
  shipImage = loadImage('turtleside.png');
  particleImage = loadImage('duffcan1.png');
	ship = createSprite(width/2, height/2);
  ship.maxSpeed = 6;
  ship.friction = 0.70;
	// make nothing touch the turtle for a circle with radius of 20
  ship.setCollider('circle', 0, 0, 100);
	// add turtle image to sprite variable
  ship.addImage('normal', shipImage);
 // ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');
	// create groups for greta bullets and duff can asteroids
  asteroids = new Group();
  bullets = new Group();
// make the duff cans rotate and _____
  for(var i = 0; i<5; i++) {
    var ang = random(360);
    var px = random(width)/2 + 1000 * cos(radians(ang));
    var py = random(height)/2+ 1000 * sin(radians(ang));
    createAsteroid(3, px, py);
  }
}

function draw() {
		background(0);
		textFont(theFont,80);
		//backgroundsound.play();
		fill(250);
		image(happybackground,0,0,width,height);
		text('CLICK Here to play and SAVE FISH FROM POLLUTION!',width/2-350,height/2-100,900,900);
		
		if (myBoolean){
		 	image(happybackground,0,0,width,height);
		 	fill(255);
		 	size1=size1+2;
		 	size2=size2+1;
		 	placex=0;
		 	placey=0;
		 	image(dark,placex,placey,size1,size2);
		// ///////
		for(var i=0; i<allSprites.length; i++) {
				// at each sprite, make sure the sprite doesn't go beyond margin
				var s = allSprites[i];
				if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
				if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
				if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
				if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
			}
		asteroids.overlap(bullets, asteroidHit); //when asteroids overlap with bullets, asteroid Hit happens
			ship.bounce(asteroids); //turtle does bouncing whatever that is with duff cans
		// change this to change the greta movements
			if(keyDown(LEFT_ARROW))
				ship.rotation -= 4;
			if(keyDown(RIGHT_ARROW))
				ship.rotation += 4;
			if(keyDown(UP_ARROW))
			{
				ship.addSpeed(10,270);
			}
			if (keyDown(DOWN_ARROW)){ //this is extra because no thrust necessary
				ship.addSpeed(10,90);
			}
			if(keyWentDown('space'))
			{
				if (ship.rotation%360>90){
					bullet = createSprite(ship.position.x, ship.position.y); //change position of bullet so it leaves turtles face, not our of turtle, more like shooting
					bullet.addImage(bulletImage);
					bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
					bullet.life = 60; //make sure a bunch of gretas don't linger. after 30 draw cycles removed
					bullets.add(bullet); 
				}
				else {
					bullet = createSprite(ship.position.x, ship.position.y); //change position of bullet so it leaves turtles face, not our of turtle, more like shooting
					bullet.addImage(bulletImage);
					bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
					bullet.life = 60; //make sure a bunch of gretas don't linger. after 30 draw cycles removed
					bullets.add(bullet); 
				}
			}

			drawSprites();
		///////
			if (timesused==15){
				var frameone=frameCount;
				image(happybackground,0,0,width,height);
				textFont(theFont,80);
				fill(250);
				text('YOU Made it to level 2!',width/2-300,height/2-100,900,900);
				var frametwo=frameCount;
				if (frametwo-frameone==50){
					text('The average person generates over 4 pounds of trash every day and about 1.5 tons of solid waste per year.',width/2-350,height/2-100,900,900);
				}
				
			}
			if (size2>715 && timesused!=15){
				image(dark,0,0,width,height);
				textFont(theFont,80);
				fill(250);
				text('YOU LOSE. THE FISH ARE DEAD.',width/2-350,height/2-100,900,900);
				translate(random(0,width),y);
				rotate(rot);
				image(seed,0,0,400,400);
				y+=5;
				rot+=0.1;
					if (y>height+80){
						y=0;
					}
			}	
		}
}
/////
function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img = loadImage('duffcan1.png');
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
//  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
	//	timesused++;
	  return a;
}

function asteroidHit(asteroid, bullet) {
	timesused++;
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
    p.life = 5;
  }

  bullet.remove();
  asteroid.remove();
}

function mousePressed(){
	myBoolean=true; 
}
