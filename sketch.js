var dog, happyDog, database, foods, foodStock;
var dogImage1, dogImage2;

function preload() {
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 800);
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  dog = createSprite(400,500,10,10);
  dog.addImage(dogImage1);
  dog.scale = 0.3;
}

function draw() {  
  background(color(0,mouseY,0));

  console.log(foods);

  if(foods !== undefined){
    if(keyWentDown(UP_ARROW)){
        writeStock(foods);
        dog.addImage(dogImage2);
    }
  }

  if(foods === 0) {
    dog.addImage(dogImage1);
    if(keyWentDown(DOWN_ARROW)) {
      database.ref("/").update({
        Food: 20
    })
    }
  }

  drawSprites();

  textFont("georgia");
  fill(255);
  strokeWeight(3);
  stroke(0);
  if(foods > 0) {
    textSize(30);
    text("Press the up arrow key to feed the dog milk!", 130,30);
  }
  if(foods !== undefined) {
    textSize(40);
    text("Food Remaining: "+foods, 230, 300);
  }
  if(foods === 0) {
    textSize(30);
    text("Press the down arrow key to refill the food!", 130,30);
  }
}

function readStock(data) {
    foods = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  } else {
    x--;
  }
  database.ref("/").update({
      Food: x
  })
}