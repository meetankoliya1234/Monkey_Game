var PLAY=0;

var END=1;

var gameState=0;

var monkey,stone,jungle,banana,score=0;

var monkey_running,stoneImage,jungleImage,bananaImage,restartImage;

var invisibleGround,survivalTime;

var obstacleGroup,foodGroup;

function preload(){
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  stoneImage=loadImage("stone.png"); 
  jungleImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
   
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
  
  jungle = createSprite(200,200,5000000,100000);
  jungle.addImage("ground",jungleImage);
  jungle.x = width/2
  jungle.velocityX = -(6 + 3*score/100);
  jungle.scale=1;
  
  monkey=createSprite(50,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  monkey.velocityY=12;  
  
  invisibleGround=createSprite(200,420,400,10);
  invisibleGround.visible=false;
  
  
  score=0;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  
}

function draw() {
  background(205);
  
  if(gameState===PLAY){
     
    
    
     score = score + Math.round(getFrameRate()/60);
  
  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  if(keyDown("space") && monkey.y  >= height-200){
    monkey.velocityY=-15;

 }
  
   if(touches.length > 0 && monkey.y  >= height-200){
        monkey.velocityY=-15;
      touches = [];
      }
  
  monkey.velocityY=monkey.velocityY+0.8; 
    
    obstacle();
  food();
    
    if(obstacleGroup.isTouching(monkey)){
  gameState=END;
     }
    
     }
  
  
  stroke("white");
  textSize(20);
  fill("red");
  text("score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("blue");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time:"+survivalTime,100,50);
  
 
  
  if(gameState===END){
    
     foodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
 
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  
  jungle.velocityX=0; 
        
   if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
    
  }
  
  
  survivalTime.depth=jungle.depth;
  survivalTime.depth=survivalTime.depth+1;
  
  score.depth=jungle.depth;
  score.depth=score.depth+1;
  

  

  monkey.collide(invisibleGround);
  
  
  
  drawSprites();
}

function obstacle(){
  
  if(frameCount%80===0){
     var stone=createSprite(900,380,20,20);
    stone.velocityX=-10;
    stone.addImage("stone",stoneImage);
    stone.scale=0.3; 
    stone.lifeTime=100;   
    obstacleGroup.add(stone);
    stone.debug=false;
    stone.setCollider('circle',0,0,100);
     }  
}

function food(){
  
  if(frameCount%60===0){
     
     var banana=createSprite(900,200,20,20);
    banana.addImage("banana",bananaImage); 
    banana.velocityX=-10;
    banana.scale=0.1;
    banana.lifeTime=100
    banana.y=Math.round(random(210,300));
    foodGroup.add(banana);
     }
  
}

function reset(){
  
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
    score = 0;
  
  jungle.velocityX=-12;
  

  
}

