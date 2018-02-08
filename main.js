
var canvas;
var canvasContext;
var ballX=10;
var ballY=10;
var ballSpeedX =10;
var ballSpeedY = 5; 
var paddleHeight =10;
var paddleWidth = 200;
var paddleX = 350;
var rightPressed = false;
var leftPressed = false;
var blocks = [];
var score = 0;

window.onload=function(){
    console.log('hello');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    startGame();
    // this is where i call the function that creates the blocks 
    
}



function updateGame(){
    //cambiar if
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle ='black'
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    moveEverthing();
    drawPaddle();
    drawBall();
    drawBlocks();
    removeBlock();
    drawScore();
}


function drawPaddle() {
    canvasContext.fillStyle ='red';
    canvasContext.beginPath();
    canvasContext.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}


function drawBall() {
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();
}

document.addEventListener('keydown',keyDownHandler, true);
document.addEventListener('keyup',keyUpHandler, true);


function keyDownHandler(e){
    if(e.keyCode === 39){
        if(paddleX<canvas.width - paddleWidth) paddleX+=30;
        //rightPressed = true;
    }
    else if(e.keyCode == 37){
        if(paddleX > 0) paddleX-=30;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed == false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}


function moveEverthing(){
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX> canvas.width){
        ballSpeedX =-ballSpeedX;
    }
    if(ballX<0){
        ballSpeedX =-ballSpeedX;
}
if(ballY + ballSpeedY < 10) {
    ballSpeedY = -ballSpeedY;
} else if(ballY + ballSpeedY > canvas.height- 10) {
    if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
    }
    else {
        //alert("GAME OVER");
        document.location.reload();
    }
}
}

 

// if(ballY> canvas.height){
//     ballSpeedY =-ballSpeedY;
// }
// if(ballY<0){
//     ballSpeedY =-ballSpeedY;
// }
// }

function drawEverthing(){


    

    blocks.push(new Block(100,0,50,15));


    blocks.push(new Block(100,0,50,15));
    blocks.push(new Block(160,0,50,15));
    blocks.push(new Block(220,0,50,15));
    blocks.push(new Block(280,0,50,15));
    blocks.push(new Block(340,0,50,15));
    blocks.push(new Block(400,0,50,15));
    blocks.push(new Block(460,0,50,15));
    blocks.push(new Block(520,0,50,15));
    blocks.push(new Block(580,0,50,15));
    blocks.push(new Block(640,0,50,15));

    blocks.push(new Block(160,20,50,15));
    blocks.push(new Block(220,20,50,15));
    blocks.push(new Block(280,20,50,15));
    blocks.push(new Block(340,20,50,15));
    blocks.push(new Block(400,20,50,15));
    blocks.push(new Block(460,20,50,15));
    blocks.push(new Block(520,20,50,15));
    blocks.push(new Block(580,20,50,15));
    
    blocks.push(new Block(220,40,50,15));
    blocks.push(new Block(280,40,50,15));
    blocks.push(new Block(340,40,50,15));
    blocks.push(new Block(400,40,50,15));
    blocks.push(new Block(460,40,50,15));
    blocks.push(new Block(520,40,50,15));

    blocks.push(new Block(280,60,50,15));
    blocks.push(new Block(340,60,50,15));
    blocks.push(new Block(400,60,50,15));
    blocks.push(new Block(460,60,50,15));

    blocks.push(new Block(340,80,50,15));
    blocks.push(new Block(400,80,50,15));
    blocks.push(new Block(370,100,50,15));

  

}

function Block(x,y,width,height,state = true){
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.state = state;
    this.color = 'blue';
    this.state = true;

    this.draw= function(){
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.x,this.y,this.w,this.h)
        
    }

    this.crashWith = function(){
        return  !(this.x < ballX + 10) &&
                (this.x + this.w > ballX) &&
                (this.y < ballY + 10) &&
                (this.y + this.h > ballY);
    }
}
function startGame(){
    blocks.push(new Block(100,0,50,15));
    drawEverthing();
    var framesPerSecond =60;
    interval = setInterval(updateGame,1000/framesPerSecond)
    console.log(blocks)
}

function drawBlocks(){
    blocks.forEach(function(block){        
        block.draw();
    })
}

function removeBlock(){
    blocks.forEach(function(block){
        if(block.crashWith()){
            console.log(block.crashWith());
            block.color = 'yellow';
            var i = blocks.indexOf(block);
            blocks.splice(i,1);
            console.log(blocks);
        }
    });

}

function drawScore() {
    canvasContext.font = "16px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: "+score, 8, 20);
}





score++;
if(score == blocks) {
    alert("YOU WIN, CONGRATULATIONS!");
    document.location.reload();
}

