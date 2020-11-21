//Create variables here
var feed,feedDog,addfood,fedTime,lastFed,foodObj,dog, happyDog,dogsprite,database, foodS, foodStock,addFoods;
function preload()
{
   dog = loadImage("images/dogImg.png");
   happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  foodObj = new Food();
  dogsprite = createSprite(200,450);
  dogsprite.addImage(dog);
  //dogsprite.addImage("images/dogImg1.png");
database = firebase.database();
foodStock = database.ref('Food');
foodStock.on("value",readStock);
dogsprite.scale = 0.5;
//for feeding and adding food
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addfood=createButton("Add Food");
addfood.position(800,95);
addfood.mousePressed(addFoods)

}


function draw() {  
  background(46,139,87);
  foodObj.display();

  
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
  drawSprites();
}
function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
function feeddrago(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}



