sonido = "";
leftX = 0;
leftY = 0;
puntuacionright = 0;
puntuacionleft = 0;
function preload(){
    sonido = loadSound("music.mp3")
}
    function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#2ED3BE");
    stroke("#2ED3BE")
    circle (leftX,leftY,20);
if(puntuacionright>0.2){

    if(rightX<=100 && rightY>=0){
        document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
        sonido.rate(0.5);
    }else if(rightX>100 && rightY<=200){
        document.getElementById("speed").innerHTML = "Velocidad = 1x";
        sonido.rate(1);
        }else if(rightX>200 && rightY <300){
            document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
            sonido.rate(1.5);
        }else if(rightX>300 && rightY <400){
            document.getElementById("speed").innerHTML = "Velocidad = 2x";
            sonido.rate(2);
        }else if(rightX>400 && rightY <500){
            document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
        sonido.rate(2.5);

    }
}
    

    if(puntuacionleft> 0.2){
        circle(leftX,leftY,20);
    numero = Number(leftY);
    removernumero = floor(numero);
    volumen = removernumero/500;
    document.getElementById("volumen").innerHTML = "Volumen: "+volumen;
    sonido.setVolume(volumen);
    }
}
function play(){
    sonido.play();
    sonido.setVolume(1);
    sonido.rate(1);
}
function modalLoaded(){
    console.log("Modelo Cargado");}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        puntuacionright = results[0].pose.keypoints[10].score;
        puntuacionleft = results[0].pose.keypoints[9].score;
        console.log("puntuacion izquierda"+puntuacionleft);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("leftX = "+leftX+",leftY = "+leftY);
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("rightX = "+rightX+" , rightY = "+rightY);
        
    }
}