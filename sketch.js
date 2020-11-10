var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(500, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(200, 350, 1020, 10);
  ground.x = ground.width/2;
  console.log(ground.x)

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background("pink");
  score = Math.ceil(frameCount/frameRate())
  
  ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  if (keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  
  spawnBanana();
  spawnObstacle();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,20);
  
  if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
        text("Game Over", 200, 180);
        text("Refresh the page to Restart", 125, 210);
    }
}

function spawnBanana(){
  if (frameCount % 80 === 0){
    var banana = createSprite(540, 200, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-4;
    banana.lifetime = 110;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacle(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(550, 310, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;
    obstacle.lifetime = 150;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
  }
}




