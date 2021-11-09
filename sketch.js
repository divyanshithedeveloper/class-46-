
var enemyGroup,roger_bulletGroup,obstaclesGroup,enemy_bulletGroup
var score=0
var lives=5
function setup() {
  
  createCanvas(800, 400);
  roger_bulletGroup=new Group()
  enemyGroup= new Group()
  obstaclesGroup=new Group()
  enemy_bulletGroup=new Group()
  
  roger = createSprite(100, 200, 50, 50);
  roger.debug=true;
  roger.setCollider("rectangle",0,0,100,170);
  
  //background_img=createSprite(200,200,30,30)

  roger.addAnimation("rogerl", rogerleft)
  roger.addAnimation("rogerr", rogerright)
  ground = createSprite(400, 350, 1000, 10)
}
function preload() {
  bullet3=loadImage("images/bullet0.png")
  bullet6 = loadImage("images/bullet3.png")
  enemy_img=loadAnimation("images/e1.png","images/e2.png","images/e3.png","images/e4.png","images/e5.png","images/e6.png")
  obstacle1 = loadImage("images/car001.png")
  background_img = loadImage("images/background.png")
  rogerleft = loadAnimation("images/left1.png", "images/left2.png", "images/left3.png", "images/left4.png", "images/left5.png", "images/left6.png")
  rogerright = loadAnimation("images/right1.png", "images/right2.png", "images/right3.png", "images/right4.png", "images/right5.png", "images/right6.png")
}
function draw() {
  background(background_img)
  spawn_obstacles();
  enemy_sprite();
  textSize(20)
  text("score:-"+score,20,20)
  textSize(20)
  text("lives:-"+lives,200,20)

  if (keyWentDown("s")) {
    bullet();

  }
  if (keyDown(LEFT_ARROW)) {
    roger.x = roger.x - 4
    roger.changeAnimation("rogerl")
  }
  if (keyDown(RIGHT_ARROW)) {
    roger.x = roger.x + 4
    roger.changeAnimation("rogerr")
  }
  if (keyDown(UP_ARROW)) {
    roger.velocityY = -3
  }
  roger.velocityY = roger.velocityY + 1
  roger.collide(ground)

  if(roger.isTouching(obstaclesGroup)){
    lives=lives-1
    obstaclesGroup.destroyEach()
  }
    for(var i =0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(roger)){
        lives=lives-1
        enemyGroup.get(i).remove();
      }
      if(enemyGroup.get(i).isTouching(roger_bulletGroup)){
        score=score+10
        roger_bulletGroup.destroyEach()
        enemyGroup.get(i).remove();
      }
    
  }
  

  
  drawSprites();

}

function bullet() {

  bullet1 = createSprite(roger.x + 60, roger.y - 28, 30, 30)
  bullet1.addImage("bullet6",bullet6)
  bullet1.velocityX = 4
  bullet1.scale = 0.2;
  roger_bulletGroup.add(bullet1)
  bullet1.lifetime = width / 2


}


function spawn_obstacles() {

  //write code here to spawn the Obstacles
  if (frameCount % 500 === 0) {
    var obstacle = createSprite(width, height - 100, 40, 10);

    obstacle.addImage(obstacle1);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    obstaclesGroup.add(obstacle);
  }
}
function enemy_sprite(){
  if(frameCount % 50 === 0){
    enemy=createSprite(width,height-135,40,40)
    enemy.velocityX=-4
    enemy.addAnimation("enemy_img",enemy_img)
    enemy.scale=1
    enemy.lifetime=170
    enemyGroup.add(enemy)
    var r=Math.round(random(0,1))
    if(r===1){
   bullet_enemy(enemy.x,enemy.y)
    }
  }
  
  function bullet_enemy(x,y) {

    bulletE = createSprite(x+10,y,30 , 30)
    bulletE.addImage("bullet3", bullet3)
    bulletE.velocityX = -4
    bulletE.scale = 0.1
    enemy_bulletGroup.add(bulletE)
    bulletE.lifetime = width / 2
  
  
  }
  
}