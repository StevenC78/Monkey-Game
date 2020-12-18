var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;

var score;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (700,300);
  
  ground=createSprite(350,285,1500,30);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  monkey=createSprite(75,250,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  survivalTime=0;
  score=0;
}


function draw() {
 background(200);
  
  stroke('white');
  textSize(20);
  fill('white');
  text("Survival Time: "+survivalTime,100,50);
  text("Score: "+score,600,50);
  
  monkey.collide(ground);

  if(gameState === PLAY){
    
    monkey.velocityY=monkey.velocityY+0.8;
  
   if(ground.x < 0){
      ground.x = ground.width/2;
   }
  
   if(keyDown('space') && monkey.y>=150){
     monkey.velocityY=-13;
   }
   
   fruit();
   rocks();
   
  console.log(score);
   if(foodGroup.isTouching(monkey)){
     score=score+1;
     foodGroup.destroyEach();
   }
   survivalTime=Math.ceil(frameCount/frameRate());
  
   if(obstacleGroup.isTouching(monkey)){
     gameState=END;
   }
  }
  else if(gameState === END){
    ground.velocityX=0;
    
    monkey.velocityX=0;
    
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function rocks(){
  if(World.frameCount%300===0){
    obstacle=createSprite(700,250,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.setLifetime=150;
    
    obstacleGroup.add(obstacle);
  }
}

function fruit(){
  if(World.frameCount%80===0){
    banana=createSprite(700,180,20,20);
    banana.y=Math.round(random(120,180));
    banana.addImage("banana",bananaImage);
    banana.scale=0.09;
    banana.velocityX=-6;
    banana.setLifetime=150;
    
    foodGroup.add(banana);
  }
}