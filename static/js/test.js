function getCursorPosition(canvas, event, scale) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;

    //console.log(parseInt(x) + " " + parseInt(y));

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(Math.floor(x), Math.floor(y), 10, 10);

}

function clear(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);
}

let canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e, scale);
});

clear(canvas);

function zoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(.125, scale), 4);

  // Apply scale transform
  el.style.transform = `scale(${scale})`;
}

let scale = 1;
const el = document.getElementById("camera-wrap");
el.onwheel = zoom;
