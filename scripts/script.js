var randomNumber = 0;

getRandomNumber = function() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        let data = JSON.parse(this.responseText);

        if (data.value) {
            randomNumber = data.value;
            document.getElementById("tip-text").innerHTML = '';
            document.getElementById("typed-number").innerHTML = 0;
            document.getElementById("new-game-btn").style.visibility = 'hidden';
            document.getElementById("input-number").disabled = false;
            document.getElementById("send-btn").disabled = false;
            console.log(randomNumber);
        } else {
            document.getElementById("tip-text").innerHTML = 'ERRO';
            document.getElementById("typed-number").innerHTML = data.StatusCode;
            document.getElementById("new-game-btn").style.visibility = 'visible';
            document.getElementById("input-number").disabled = true;
            document.getElementById("send-btn").disabled = true;
            console.log(data, 'Erro');
        }
    }

    xhr.onerror = function() {
        alert(
            `Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`
        );
    };

    xhr.open(
        "GET",
        "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
    );
    xhr.send();
}

handleClickSendButton = function() {
    const value = document.getElementById("input-number").value;
    document.getElementById("typed-number").innerHTML = value;

    if (value > randomNumber) {
        document.getElementById("tip-text").innerHTML = 'É menor';
    } else if (value < randomNumber) {
        document.getElementById("tip-text").innerHTML = 'É maior';
    } else {
        document.getElementById("tip-text").innerHTML = 'Você acertou!!!!';
        document.getElementById("new-game-btn").style.visibility = 'visible';
        document.getElementById("input-number").disabled = true;
        document.getElementById("send-btn").disabled = true;
    }
}

getRandomNumber()