var randomNumber = 0;
const orange = '#FF6600';
const red = '#CC3300';
const green = '#32BF00';

getRandomNumber = function() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        let data = JSON.parse(this.responseText);

        if (data.value) {
            console.log(data.value);
            randomNumber = data.value;
            document.getElementById("tip-text").innerHTML = '';
            generateCanvas(0);
            document.getElementById("new-game-btn").style.visibility = 'hidden';
            document.getElementById("input-number").disabled = false;
            document.getElementById("input-number").value = '';
            document.getElementById("send-btn").disabled = false;
        } else {
            document.getElementById("tip-text").innerHTML = 'ERRO';
            document.getElementById("tip-text").style.color = red;
            generateCanvas(data.StatusCode, red);
            document.getElementById("new-game-btn").style.visibility = 'visible';
            document.getElementById("input-number").disabled = true;
            document.getElementById("input-number").value = '';
            document.getElementById("send-btn").disabled = true;
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
        document.getElementById("tip-text").style.color = orange;
        document.getElementById("tip-text").innerHTML = 'É menor';
    } else if (value < randomNumber) {
        document.getElementById("tip-text").style.color = orange;
        document.getElementById("tip-text").innerHTML = 'É maior';
    } else {
        generateCanvas(value, green);
        document.getElementById("tip-text").style.color = green;
        document.getElementById("tip-text").innerHTML = 'Você acertou!!!!';
        document.getElementById("new-game-btn").style.visibility = 'visible';
        document.getElementById("input-number").disabled = true;
        document.getElementById("send-btn").disabled = true;
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