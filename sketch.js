var jungle,invisibleground,jungleImage;
var monkeyGroup,monkey_01,monkey_02,monkey_03,monkey_04,monkey_05,monkey_06,monkey_07,monkey_08,monkey_09,monkey_10;

var stonesGroup,stoneImage;

var bananaGroup,bananaImage

var monkeyAnimation;

var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  jungleImage=loadImage("jungle.jpg");
  
  stoneImage=loadImage("stone.png");
  monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
bananaImage=loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  jungle=createSprite(200,200,400,400);
  jungle.addImage(jungleImage);
  jungle.x=jungle.width/2;
  jungle.velocityX=-4;
  jungle.scale=0.8;
  
  invisibleGround = createSprite(20,380,800,10);
  invisibleGround.visible = false;
  
 StonesGroup = new Group();
 BananaGroup = new Group();
  
  monkey=createSprite(70,320,10,10);
  monkey.addAnimation("jumping",monkeyAnimation);
  monkey.scale=0.15;
  
  Score=0;
}

function draw() {
  background(255);
  

  if(gameState===PLAY){
  
  if(jungle.x<-10){
    jungle.x=jungle.width/2;
  }
  if (keyDown( "space")&& monkey.y>=250){
    monkey.velocityY=-18;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  spawnStones();
  spawnBanana();
  

    
    if (monkey.isTouching(BananaGroup)){
      score=score+1;
      BananaGroup.destroyEach();

    }
    
    if (monkey.isTouching(StonesGroup)){
      gameState=END;
    
    }
  
  }
  
  if (gameState===END){
   
    jungle.velocityX=0;
    StonesGroup.setVelocityEach(0);
    BananaGroup.setVelocityEach(0);
    StonesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
  }
  monkey.collide(invisibleGround);
  drawSprites();
  text("Score: "+ score, 300,50);
  textSize(310);
  

}

function spawnStones(){
  if(frameCount % 170 === 0) {
    var obstacle = createSprite(400,370,20,10);
    obstacle.velocityX=-4;
    
    var rand = Math.round(random(1,6));
    obstacle.addImage(stoneImage)
    obstacle.scale=0.1;
    obstacle.lifetime=100;
    StonesGroup.add(obstacle);
}
}

function spawnBanana(){
  if(frameCount % 250 === 0) {
    var banana = createSprite(400,340,20,10);
    banana.velocityX=-4;
    
    var rand = Math.round(random(1,6));
    banana.addImage(bananaImage);
    banana.scale=0.1/2;
    banana.lifetime=100;
    BananaGroup.add(banana);
}
}
