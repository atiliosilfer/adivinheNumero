var randomNumber = 0;
const orange = '#FF6600';
const red = '#CC3300';
const green = '#32BF00';

function screenManager(tipText, tipTextColor, newGameButtonVisibility, inputNumberDisabled, inputNumberValue, sendButtonDisabled, generateCanvasNumber, generateCanvasColor) {
    generateCanvas(generateCanvasNumber, generateCanvasColor);
    tipTextManager(tipText, tipTextColor);
    document.getElementById("new-game-btn").style.visibility = newGameButtonVisibility ? 'visible' : 'hidden';
    document.getElementById("input-number").disabled = inputNumberDisabled;
    document.getElementById("input-number").value = inputNumberValue;
    document.getElementById("send-btn").disabled = sendButtonDisabled;
}

function tipTextManager(tipText, tipTextColor) {
    document.getElementById("tip-text").innerHTML = tipText;
    document.getElementById("tip-text").style.color = tipTextColor;
}

getRandomNumber = function() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        let data = JSON.parse(this.responseText);

        if (data.value) {
            randomNumber = data.value;
            screenManager('', orange, false, false, '', false, 0);
        } else {
            screenManager('ERRO', red, true, true, '', true, data.StatusCode, red);
        }
    }

    xhr.open(
        "GET",
        "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
    );

    xhr.send();
}

handleClickSendButton = function() {
    let value = Math.trunc(document.getElementById("input-number").value);

    value = value <= 300 ? (value == '' || value < 0 ? 0 : value) : 300;

    generateCanvas(value);

    if (value > randomNumber) {
        tipTextManager('É menor', orange);
    } else if (value < randomNumber) {
        tipTextManager('É maior', orange);
    } else {
        screenManager('Você acertou!!!!', green, true, true, '', true, value, green);
    }
}

generateCanvas = function(number, color) {
    let canvas = document.getElementById("canvas");
    let sevenSegment;

    if (number < 10) {
        sevenSegment = new SevenSegment(1, canvas, color, 1 / 3 * canvas.width, canvas.height, 1 / 3 * canvas.width);
    } else if (number < 100) {
        sevenSegment = new SevenSegment(2, canvas, color, 2 / 3 * canvas.width, canvas.height, 0.5 / 3 * canvas.width);
    } else {
        sevenSegment = new SevenSegment(3, canvas, color, canvas.width, canvas.height);
    }

    sevenSegment.DisplayText(number);
}

document.addEventListener("DOMContentLoaded", function(event) {
    getRandomNumber()
});