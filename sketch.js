var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed;

//crea aquí las variables feed y lastFed 


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  removeFood = createButton("Alimentar al perro")
  removeFood.position(600, 95)
  removeFood.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
 
  fill("orange")
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFed >= 12){ 
    text("Última hora en que se alimentó: " + lastFed % 12 + " PM", 350, 300);
    } else if(lastFed==0) {
      text("Última hora en que se alimentó: 12 AM", 350, 300);
    } else{
      text("Última hora en que se alimentó: " + lastFed + " AM", 350, 300);
    }
 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  foodS = foodS - 1

  if(foodS < 0){
    foodS = 0
  }

  database.ref('/').update({
     Food: foodS
  })
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS,
    FeedTime: hour()
  })
}

//ipiripidiboogaaboogieboo
