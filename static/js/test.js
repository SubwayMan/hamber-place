// color enums
const colors = [
    [255, 255, 255, 255],
    [255, 0, 0, 255],
    [255, 153, 0, 255],
    [255, 255, 0, 255],
    [0, 255, 0, 255],
    [0, 153, 255, 255],
    [153, 0, 255, 255],
    [0, 0, 0, 255]
];

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

function updateColor(position, colorId) {
    for (let i = 0; i<4; i++) {
        boardState[position*4+i] = colors[colorId][i]
    }
}

const csrftoken = getCookie("csrftoken");

function drawPixel(x, y, colorID) {   


    updateColor(y*250+x, colorID);
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
    for (var i=0; i<data.length; i++) {
        id = parseInt(data[i]);
        updateColor(i, id);
    }
}


function redrawCanvas() {
    let dat = new ImageData(boardState, 250, 250);
    ctx.putImageData(dat, 0, 0);
}

function sendPixel(x, y, color) {
    let px = y*250 + x;
    console.log(userId);
    fetch("ajax/update", {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({pixel: px, color: color, auth: userId}) //JavaScript object of data to POST
    })
    .then(response => {
          return response.status;
    })
    .then(status => {
        if (status==200) {
            sendWebsocketPixel(x, y, color);
        }
    });
    //.then(data => {
    //})
}

let userId;
function login() {
    id = prompt();
    while (!id) {
        id = prompt();
    }
    fetch("ajax/login", {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({auth: id})
    })
    .then(response => {
        return response.status;
    })
    .then(result => {
        if (result==200) {
            userId = id;
        } else {
            login();
        }
        
    });
}
login();    

let timerInterval = setInterval(updateTimer, 1000);
function updateTimer() {
    let timer = document.getElementById("timer");
    let val = timer.textContent.trim();
    if (val !== "Ready to place Tile!") {
        let time = +val.split(" ")[0].slice(0,-1);

        if (time == 0) {
            timer.textContent = "Ready to place Tile!";
            timer.classList.remove("waiting");
        } else {
            time -= 1;
            timer.textContent = time + "s remaining";
        }
    }

}

// websocket stuff
const websocket = new WebSocket( 'ws://' + window.location.host + '/ws/canvas/');

websocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    updateColor(data.position, data.color)
}

function sendWebsocketPixel(x, y, color) {
    let position = 250*y + x;
    websocket.send(JSON.stringify({
        "position": position,
        "color": color
    }));
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

// store board state, to use PutImageData
let boardState = new Uint8ClampedArray(250*250*4).fill(255);

canvas.addEventListener("mousedown", function(e) {
    mouseIsDown = true;
    mouseDownTime = e.timeStamp;
    mouseDownX = e.offsetX;
    mouseDownY = e.offsetY;
});

canvas.addEventListener("mouseup", function(e) {
    let timer = document.getElementById("timer");

    e.preventDefault();
    mouseIsDown = false;
    mouseUpTime = e.timeStamp;
    if (mouseUpTime - mouseDownTime < 400 && !dragging && !timer.classList.contains("waiting")) {
        const rect = canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left) / scale);
        let y = Math.floor((e.clientY - rect.top) / scale);
        let colorId = document.querySelector('input[name="color"]:checked').value
        drawPixel(x, y, colorId);
        sendPixel(x, y, colorId);

        timer.classList.add("waiting")
        timer.textContent = "10s remaining"
    }
    dragging = false;
});

cameraMove.addEventListener("mousemove", function(e) {
    if (mouseIsDown) {
        if (Math.abs(e.offsetX - mouseDownX) > 1 ||
            Math.abs(e.offsetY - mouseDownY) > 1) {
            dragging = true;
        }
        panX += (e.offsetX - mouseDownX);
        panY += (e.offsetY - mouseDownY);
        limitPanVariables();
        panCanvas(cameraMove, panX, panY);

    }
});


cameraZoom.addEventListener("wheel", function(e) {
    zoom(e, cameraZoom);
});

// redraw canvas every 200ms
setInterval(redrawCanvas, 200);

let scale = 4;
cameraZoom.style.transform = `scale(${scale})`;

clear(canvas);
getBoard();


