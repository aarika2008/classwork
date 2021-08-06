song = ""
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded)
    posenet.on('pose', gotposes)
}
function draw() {
    image(video, 0, 0, 600, 500);
    if (scoreleftwrist > 0.2) {
        fill("red");
        stroke("red");
        circle(leftwristx, leftwristy, 20);
        numberlwy = Number(leftwristy);
        remove_decimals = floor(numberlwy);
        volume = remove_decimals / 500
        song.setVolume(volume);
        console.log(volume)
        document.getElementbyId("volume").innerHTML = "volume : " + volume;
    }
    fill("red");
    stroke("red");
    circle(rightwristx,rightwristy,20);
    if (rightwristy>0 && rightwristy<=100){
        document.getElementbyId("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    if (rightwristy>100 && rightwristy<=200){
        document.getElementbyId("speed").innerHTML="speed=1.0xx";
        song.rate(1.0);
    }
    if (rightwristy>200 && rightwristy<=300){
        document.getElementbyId("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    if (rightwristy>300 && rightwristy<=400){
        document.getElementbyId("speed").innerHTML="speed=2.0x";
        song.rate(2.0);
    }
    if (rightwristy>400 && rightwristy<=500){
        document.getElementbyId("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
function play() {
    song.play();
    song.setVolume(1)
    song.rate(1)
}

function modelloaded() {
    console.log("posenet model has been initialzed")
}
function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx=" + leftwristx + "leftwristy=" + leftwristy)
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx=" + rightwristx + "riightwristy=" + rightwristy)
        scoreleftwrist = results[0].pose.keypoints[9].score
    }
}