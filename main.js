status = "";
percent = 0;
objects = [];


function setup() {
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector('Coco Single-Shot MultiBox Detection Status', modelLoaded);
document.getElementById("status").innerHTML = "Detecting Objects...";
document.getElementById("number").innerHTML = "PLease Wait! Detecting Objects...";
}

function modelLoaded() {
    console.log("Coco Single-Shot MultiBox Detection Model Status = Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video,0,0,380,380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) { 
        document.getElementById("status").innerHTML = "Detected Objects!"; 
        document.getElementById("number").innerHTML = "Number of objects detected: " + objects.length; 
        fill(r,g,b); percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
        noFill(); 
        stroke(r,g,b); 
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }
    }
}