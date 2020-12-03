// declaring variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  // loading images 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600);
  // adding survival time 
  var survivalTime=0;
  
  // creating monkey 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("Moving" , monkey_running);
  monkey.scale = 0.1;
  
  
  // creating ground 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  
  //creating new groups 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}


function draw() {
background("white");
  
  
  // creating moving ground 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  // making the ground move 
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  // adding gravity 
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.debug = true;
  
  
  // making the monkey collide 
  monkey.collide(ground);   
    bananas();
    obstacles();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);  
  
  // PLAY state end 
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
  }
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function obstacles() {
  //spawning obstacles at random places 
  if(frameCount%300===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("Stops the monkey" , obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
  
  
}

function bananas(){
    //spawning bananas at random places 
    if(frameCount%80===0){
    banana = createSprite(600,250,40,10);
    banana.velocityX = -6;
    banana.y = random(120,200); 
    banana.addImage("EAT YOUR FOOD" , bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
  
}



