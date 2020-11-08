//Create variables here
var dog, happyDog; 
var database;
var foodS, foodStock;
var readStock, feed;
var feedPet, addFood, addFoods, foodObj;
var fedTime, lastFed; 
function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  
}

function setup() {
  
  database = firebase.database();
  
  createCanvas(500, 500);
  dog = createSprite(400, 250, 20, 20);
  dog.addImage(dogImage);
  dog.scale = .2;

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    feed = createButton("Feed the dog");
  feed.position(625, 95);
  feed.mousePressed(feedPet);

  addFood = createButton("Add Food");
  addFood.position(725, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  
    foodObj.display();
    fedTime=database.ref('FeedTime'); 
    fedTime.on("value",function(data){ lastFed=data.val(); });
    drawSprites();
    }


function readStock(data){
foodS = data.val();
console.log("Hi");
console.log(foodS);
foodObj.updateFoodStock(foodS);
}

function writeStock(x){

if(x<=0){
x=0;
}
else{
  x=x-1;
}


database.ref('/').update({
Food:x 
})

}

function addFoods(){
  console.log(foodS)
  foodS++;
  database.ref('/').update({
  Food:foodS
})
}

function feedPet(){
  dog.addImage(happyDog);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}




