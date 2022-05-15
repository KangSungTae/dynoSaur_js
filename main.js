var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

dinoImg = new Image();
dinoImg.src = './resource/dyno.png'; 

cactusImg = new Image();
cactusImg.src = './resource/cactus.png';


var dino = {
    x : 10 ,
    y : 200 , 
    width : 50 , 
    height : 50 , 
    draw(){
        // ctx.fillStyle = 'green'; 
        // ctx.fillRect(this.x , this.y , this.width , this.height);
        ctx.drawImage(dinoImg,this.x,this.y,this.width,this.height);
    }
} 

class Cactus {
    constructor(){
        this.x = 500 ,
        this.y = 200 ,
        this.width = 50 ,
        this.height = 50 
    }
    setData(x,y,width,heigth){
        this.x = x ,
        this.y = y ,
        this.width = width ,
        this.height = heigth 
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x , this.y , this.width , this.height);
        ctx.drawImage(cactusImg,this.x,this.y,this.width,this.height);
    } 
}

var timer = 0;
var cactusArr = [];
var jumpTimer = 0;
var jump = false; 
var animation;

function runDino(){   
    animation = requestAnimationFrame(runDino);
    timer++;

    ctx.clearRect( 0 , 0, canvas.width , canvas.height);

    if(timer % 180 === 0){
        // var cactus1 = new Cactus();
        // cactus1.setData(400,150,50,50);
        var cactus2 = new Cactus();
        // cactusArr.push(cactus1);
        cactusArr.push(cactus2);
    }

    cactusArr.forEach((data , index , object )=>{
        if(data.x < 0){
            object.splice(index , 1);
        }
        data.x -= 2; 
        collision(dino , data);
        data.draw();
    })

    if(jump === true){
        dino.y -= 3;
        jumpTimer ++;
    }
    if(jumpTimer > 50 ){
        jump = false;
    }
    if(jumpTimer > 50 && jump === false && dino.y != 200){
        dino.y += 3;
        dino.y === 200 ? jumpTimer = 0 : jumpTimer; 
    }
    dino.draw(); 
}

runDino();

document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jump = true; 
    }
});

function collision( dino , cactus ){
    var xgap = cactus.x -  (dino.x + dino.width);
    var ygap = cactus.y -  (dino.y + dino.height);

    if(xgap < 0 && ygap < 0){
        ctx.clearRect( 0 , 0, canvas.width , canvas.height);
        cancelAnimationFrame(animation);
    }
}