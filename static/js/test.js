function drawPixel(canvas, event, scale) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;

    //console.log(parseInt(x) + " " + parseInt(y));

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);

}

function clear(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);
}

// these variables help distinguish between actual clicks and drags
var dragf = false, mouseDownTime=0, mouseUpTime;
let canvas = document.getElementById('canvas');

canvas.addEventListener('mousedown', function(e) {
    mouseDownTime = e.timeStamp;

});

canvas.addEventListener('mouseup', function(e) {
    mouseUpTime = e.timeStamp;
    if (mouseUpTime - mouseDownTime < 300) {
        drawPixel(canvas, e, scale);
    }
});

clear(canvas);

function zoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(2, scale), 20);

  // Apply scale transform
  el.style.transform = `scale(${scale})`;
}

let scale = 4;
const el = document.getElementById("camera-wrap");
el.style.transform = `scale(${scale})`;
el.onwheel = zoom;
