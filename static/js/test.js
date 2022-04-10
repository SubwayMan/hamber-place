function drawPixel(canvas, event, scale) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;

    //console.log(parseInt(x) + " " + parseInt(y));

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);

}

function panCanvas(cv, xDist, yDist) {
    canvas.style.transform = `translate(${xDist}px,
    ${yDist}px)`
}

function clear(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);
}

function zoom(event, el) {
  event.preventDefault();
  scale += event.deltaY * -0.03;

  // Restrict scale
  scale = Math.min(Math.max(2, scale), 50);
  // Apply scale transform
  el.style.transform = `scale(${scale})`;
}

// these variables help distinguish between actual clicks and drags
var dragf = false, mouseDownTime=0, mouseUpTime, mouseIsDown=false;
let canvas = document.getElementById("canvas");
let positionData = canvas.getBoundingClientRect();
let panX = 0, panY = 0, mouseDownX = 0, mouseDownY = 0;

// allow us to set zoom and scale indepentently
const cameraZoom = document.getElementById("camera-zoom");
const cameraMove = document.getElementById("camera-move");

canvas.addEventListener("mousedown", function(e) {
    mouseIsDown = true;
    mouseDownTime = e.timeStamp;
    mouseDownX = e.offsetX;
    mouseDownY = e.offsetY;
});

canvas.addEventListener("mouseup", function(e) {
    mouseIsDown = false;
    mouseUpTime = e.timeStamp;
    if (mouseUpTime - mouseDownTime < 300 && !dragf) {
        drawPixel(canvas, e, scale);
    }
    dragf = false;
});


cameraMove.addEventListener("mousemove", function(e) {
    if (mouseIsDown) {
        dragf = true;
        panX += (e.offsetX - mouseDownX);
        panY += (e.offsetY - mouseDownY);

        panCanvas(cameraMove, panX, panY);
    }
});

cameraZoom.addEventListener("wheel", function(e) {
    zoom(e, cameraZoom);
});

let scale = 4;
cameraZoom.style.transform = `scale(${scale})`;

clear(canvas);


