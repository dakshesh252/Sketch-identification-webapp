function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}


function clear_canvas() {
    background("white")
}

function preload() {
    classifier = ml5.imageClassifier('doodlenet');
}


function draw() {
    strokeWeight(17);
    stroke('black');
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}



function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "Label : " + results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}