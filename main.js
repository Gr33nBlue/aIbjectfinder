Status = "";
objects = [];

function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450)
    video.hide();
}

function draw() {
    image(video, 0, 0, 450, 450)
    if(Status != "") {
        objectDetector.detect(video, GotResults);
        document.getElementById("status").innerHTML = "Objects Detected"
        for(i = 0; i < objects.length; i++) {

        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + percent + "%" + objects[i].x, objects[i].y);
        noFill();
        stroke("red");
        rect(objects[i].x - 15, objects[i].y - 15, objects[i].width - 30, objects[i].height - 30);
        }
        }
}

function start() {
    objectDetector = ml5.objectDetector('cocosd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}

function modelLoaded() {
    console.log('Cocosd IS WORKING');
    Status = true;
}

function GotResults(error, results) {
    if(error){
        console.error()
    }
    else {
        console.log(results);
        objects = results;
    }
}