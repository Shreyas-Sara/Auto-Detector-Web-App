status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start(){
    detector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}

function modalLoaded(){
    console.log("Modal loaded successfull");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        detector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number").innerHTML = "Number of Objects Detected are: " + objects.length;
            fill("green");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}