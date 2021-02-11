var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");

//pctr
var bird= new Image();
var bg= new Image();
var floor= new Image();
var pipeUp= new Image();
var pipeDown= new Image();

bird.src="img/bird.png";
bg.src="img/bg.png";
floor.src="img/floor.png";
pipeUp.src="img/pipeUp.png";
pipeDown.src="img/pipeBottom.png";


//sound

var fly= new Audio();
var scoreAudio= new Audio();

fly.src="audio/fly.mp3";
scoreAudio.src="audio/score.mp3";

//
var gap =90;
var score=0;

// bird up move
document.addEventListener("keydown",moveUp);

function moveUp(){
    yPos-=25;
    fly.play();
}

//blocks

var pipe=[];

pipe[0]={
    x: cvs.width,
    y: 0,
}

//bird position

var xPos=10;
var yPos=150;
var grav=1.5;



function draw(){
    ctx.drawImage(bg,0,0); //src,x,y

    for(var i=0;i<pipe.length;i++){
        ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);

        ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y+ pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x==125){
            pipe.push({   //add new object in masss pipe
                x: cvs.width,
                y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height
            });
        }

        if(xPos+bird.width>=pipe[i].x && xPos<=pipe[i].x+ pipeUp.width && (yPos<=pipe[i].y+pipeUp.height || yPos+bird.height>=pipe[i].y+pipeUp.height+gap) || yPos+bird.height>=cvs.height-floor.height){
            location.reload(); //reload when crah
        }
        if(pipe[i].x==5){
            score++;
            scoreAudio.play();
        }
    }


    ctx.drawImage(floor,0,cvs.height-floor.height)

    ctx.drawImage(bird,xPos,yPos);

    yPos+=grav;
    
    ctx.fillStyle="#000";
    ctx.font="20px Verdana";
    ctx.fillText("Score:" + score,10,cvs.height-20);
    requestAnimationFrame(draw); //constantly calls drawing function
}

pipeDown.onload=draw; // draw func will start when last pic install