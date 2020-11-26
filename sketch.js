var dog_img, dog, happy_dog, database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dog_img = loadImage("Dog.png");
  happy_dog = loadImage("happydog.png");
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  feed = createButton("Feed the dog");
        feed.position(700, 95);
        feed.mousePressed(feedDog);

        addFood = createButton("Add food for the dog");
        addFood.position(800, 95);
        addFood.mousePressed(addFoods);
  dog = createSprite(250, 250);
  dog.addImage(dog_img);
  dog.scale = 0.5;
  foodStock = database.ref('Food');
  foodObj = new Food();
  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed :" + lastFed % 12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 30);
  }
  else{
    text("Last Feed :" + lastFed + "AM", 350, 30);
  }
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  drawSprites();
  text('database/foodStock');

  fedTime = database.ref('Feed Time');
  fedTime.on("value", function(data){
    lastFed = data.val();  
  })
  
}
function feedDog(){
  dog.addImage(happy_dog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
