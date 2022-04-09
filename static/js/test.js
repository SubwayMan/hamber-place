function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(Math.floor(x), Math.floor(y), 10, 10);

}

let canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
});
