// apparently you need this for POST requests idk
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie("csrftoken");

function drawPixel(x, y) {

    //console.log(parseInt(x) + " " + parseInt(y));
    ctx.fillStyle = "green";
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    
}

function panCanvas(cv, xDist, yDist) {
    cv.style.transform = `translateX(${xDist}px) translateY(${yDist}px)`
}

function limitPanVariables() {
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let positionData = canvas.getBoundingClientRect();

    if (positionData.top > centerY) {
        panY = positionData.height/2
    }
    if (positionData.bottom < centerY) {
        panY = -positionData.height/2 + 10
    }
    if (positionData.left > centerX) {
        panX = positionData.width/2
    }
    if (positionData.right < centerX) {
        panX = -positionData.width/2 + 10
    }
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

function getBoard() {
    fetch("ajax/canvas", {
      headers:{
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
      },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        board = data["board"];
        updateBoard(board);
    });
}

function updateBoard(data) {
    let coords = data.split(",");
    for (const coord of coords) {
        let v = parseInt(coord);
        let x = v%250, y = Math.floor(v/250);
        drawPixel(x, y);

    }
}

function sendPixel(x, y) {
    fetch("ajax/update", {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"x": x, "y": y}) //JavaScript object of data to POST
    })
    .then(response => {
          return response.json() //Convert response to JSON
    });
    //.then(data => {
    //})
}

// these variables help distinguish between actual clicks and drags
var dragging=false, mouseDownTime=0, mouseUpTime, mouseIsDown=false;
let canvas = document.getElementById("canvas");
let positionData = canvas.getBoundingClientRect();
let panX = 0, panY = 0, mouseDownX = 0, mouseDownY = 0;

const ctx = canvas.getContext("2d");

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
    if (mouseUpTime - mouseDownTime < 300 && !dragging) {
        drawPixel(e.offsetX, e.offsetY);
        sendPixel(e.offsetX, e.offsetY);
    }
    dragging = false;
});

cameraMove.addEventListener("mousemove", function(e) {
    if (mouseIsDown) {
        dragging = true;
        panX += (e.offsetX - mouseDownX);
        panY += (e.offsetY - mouseDownY);
        limitPanVariables()
        panCanvas(cameraMove, panX, panY);

    }
});


cameraZoom.addEventListener("wheel", function(e) {
    zoom(e, cameraZoom);
});

let scale = 4;
cameraZoom.style.transform = `scale(${scale})`;

clear(canvas);
getBoard();


