//Create variables here
var dogSprite, dogImage, happyDog, database, foodStock, foodS;
var feedPet, addFood, fedTime, lastFed, foodObj;
function preload(){
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup(){
	createCanvas(800, 500);
  dogSprite = createSprite(550, 250, 10, 10);
  dogSprite.addImage(dogImage);
  dogSprite.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();
  feedPet = createButton("Feed the dog");
  feedPet.position(500, 95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

}


function draw(){  
  background(46, 139, 87);

  drawSprites();
  textSize(15);
  fill("White"); 
  text("Note : Press up arrow to feed Drago milk", 430, 100);
  text("You have " + foodS + " milk bottles left", 450, 350);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + " PM", 350, 30);
  } else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : "+ lastFed + " AM", 350, 30);
  }


}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=1){
    x=1;
  }
  database.ref('/').update({
    Food:x
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  writeStock(foodS);
  dogSprite.addImage(happyDog);
  foodS = foodS-1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}
