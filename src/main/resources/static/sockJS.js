var stompClient = null;
var message = document.getElementById("message");
var textArea = document.getElementById("chatText");
var usernameBar = document.getElementById("usernameBar");

function connect() {
    var socket = new SockJS('/ws/');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, function onError(error) {
        alert("WebSocket error: " + error);
    });
}

function onConnected() {
    stompClient.subscribe("/public/chat", receiveMessage);
}

function receiveMessage(message) {
    var json = JSON.parse(message.body);
    var content = json.username + ": " + json.content;
    var messageContent = document.createTextNode(content);
    var messageRow = document.createElement("li");

    if (json.username !== usernameBar.textContent)
        messageRow.style.textAlign = "left";
    else
        messageRow.style.textAlign = "right";

    messageRow.appendChild(messageContent);
    textArea.appendChild(messageRow);
}

function sendMessage() {
    var messagePayload = {
        "username": usernameBar.textContent,
        "content": message.value
    }
    stompClient.send("/app/chat/sendMessage", {}, JSON.stringify(messagePayload));
    message.value = "";
}

connect();

message.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        sendMessage();
    }
});