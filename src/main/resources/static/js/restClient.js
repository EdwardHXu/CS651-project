"use strict";

function getAllAgents() {
    sendHttpRequest("GET", "agent/all", null, displayAllAgents);
}

function deleteAllAgents() {
    sendHttpRequest("DELETE", "agent/all", null, getAllAgents);
}

function createAgent() {
    var idx = getNextCount();
    var platformName = navigator.platform;
    var name = prompt("Please input your name.", platformName);
    // var name = "Agent" + idx;
    var port = 3000 + idx;
    sendHttpRequest("POST", "agent?name=" + name + "&port=" + port, null, displayAgent);
}

function deleteAgent(name) {
    sendHttpRequest("DELETE", "agent?name=" + name, null, getAllAgents);
}

function getAgent() {
    var name = document.getElementById("agentNameGet").value;
    sendHttpRequest("GET", "agent?name=" + name, null, null);
}

function mine(name) {
    var platformMessage = navigator.platform;
    var message = prompt("Please input your chatting messages.", platformMessage);
    sendHttpRequest("POST", "agent/mine?agent=" + name + "&message=" + message, null, getAllAgents);

}

function sendHttpRequest(action, url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open(action, url, true);
    xmlHttp.send(data);
}

var getNextCount = (function () {
    if (!sessionStorage.count) {
        sessionStorage.count = 0;
    }
    return function () {
        sessionStorage.count = Number(sessionStorage.count) + 1;
        return Number(sessionStorage.count);
    }
})();