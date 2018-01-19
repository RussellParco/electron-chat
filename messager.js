var Token;
var userID;
var selection;
var scrolled = false;
Token = localStorage.getItem("Token");
userID = localStorage.getItem("userID");

defaultstartofchat = "<p><i>Begining of Chat</i></p>";
defaultemptychat = "<p><i>This chat is empty, be the first person to say something</i></p>";
refreshrate = 250;

$(document).ready(function() {
    document.getElementById("chatmainblock").addEventListener("scroll", function() {
        scrollled = true;
    });
});

function updateSelecton() { //change this to use POST
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(xhttp.responseText);
                //document.getElementById("test").innerHTML = json;
                var list = document.getElementById("chatselect");
                var updateChats = function(item, index) {
                        //alert(item.Chatname);
                        var option = document.createElement('option');
                        option.text = item.Chatname;
                        option.value = item.chatID;
                        list.add(option);

                        var chatOption = document.createElement('div');
                        chatOption.className = "choice";
                        chatOption.id = item.chatID;
                        chatOption.innerHTML = item.Chatname;

                        document.getElementById("choice-container").appendChild(chatOption);
                        chatOption.addEventListener("click", function(event) {
                            chatselect.options[chatselect.selectedIndex].value = chatOption.id;
                            document.getElementById("chat-title").innerHTML = option.text;
                            scrolled = false;
                            updateMembers(chatOption.id);
                        });
                    }
                    //just use for loop?
                json.forEach(updateChats);
            } else if (this.readyState == 4 && this.status == 401) {
                alert('unauthorized');
            }
            //remove these later
            else if (this.readyState == 4 && this.status == 500) {
                alert('Error');
            }
        }
        //change all this to POST getis not a good idea
    xhttp.open("GET", "http://jordanscrivo.ga/chat?token=" + Token, true);
    xhttp.send();
}

function changeChats(chatID) { //change or remove this
    if (chatID == "") {
        document.getElementById("test").innerHTML = 'Select a chat to begin';
    } else {
        document.getElementById("test").innerHTML = 'input from option: ' + chatID;
    }
    document.getElementById("chatmainblock").innerHTML = "";
}

function createChat() {
    var newChatname = document.getElementById("createchatname").value;

    if (newChatname == "") {
        alert("Please enter a chat name");
    } else {
        var request = new XMLHttpRequest();
        var url = "http://jordanscrivo.ga/createchat";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                json = JSON.parse(request.responseText);
                //alert(json.Status);
                var list = document.getElementById("chatselect");
                var option = document.createElement('option');
                option.text = newChatname;
                option.value = json.chatID;
                list.add(option);
                //handle responseText

            } else if (request.status === 401 && request.readyState === 4) {
                alert("Server returned 401");
            } else if (request.readyState === 4 && request.status === 500) {
                alert("Server returned 500");
            } else if (request.status === 400 && request.readyState === 4) {
                alert("Server returned 400");
            }
        }
        var data = JSON.stringify({ "newChatname": newChatname, "Token": Token });
        request.send(data);

        document.getElementById("createchatname").value = "";
    }
}

function addMember() {
    var memberUsername = document.getElementById("addmemberusername").value;
    var chatselect = document.getElementById("chatselect");
    var chatID = chatselect.options[chatselect.selectedIndex].value;

    if (memberUsername == "") {
        alert("Please enter a username");
    } else if (chatID == "") {
        alert("Please select a chat before attempting to add a member");
    } else {
        var request = new XMLHttpRequest();
        var url = "http://jordanscrivo.ga/addmember";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                //json = JSON.parse(request.responseText);
                //alert(json.Status);
                //var list = document.getElementById("chatselect");
                //var option = document.createElement('option');
                //option.text = newChatname;
                //option.value = json.chatID;
                //list.add(option);
                //handle responseText

            } else if (request.status === 401 && request.readyState === 4) {
                alert("Server returned 401");
            } else if (request.readyState === 4 && request.status === 500) {
                alert("Server returned 500");
            } else if (request.status === 400 && request.readyState === 4) {
                alert("User does not exist or is already a member of this chat");
            }
        }
        var data = JSON.stringify({ "chatID": chatID, "Token": Token, "memberUsername": memberUsername });
        request.send(data);
        document.getElementById("addmemberusername").value = "";
    }
}

function sendMessage(e) {
    var message = document.getElementById("chatinput").value;
    var chatselect = document.getElementById("chatselect");
    var chatID = chatselect.options[chatselect.selectedIndex].value;
    if (e.keyCode == 13 && message != "" && chatID != "") { //change this for security reasons later?
        var request = new XMLHttpRequest();
        var url = "http://jordanscrivo.ga/sendMessage";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                json = JSON.parse(request.responseText);
                //alert(json.Status);
                //make it so that sent messages are grey and messages received by the server are black

            } else if (request.status === 401 && request.readyState === 4) {
                alert("Server returned 401");
            } else if (request.readyState === 4 && request.status === 500) {
                alert("Server returned 500");
            } else if (request.status === 400 && request.readyState === 4) {
                //alert("User does not exist or is already a member of this chat");
            }
        }
        var data = JSON.stringify({ "chatID": chatID, "Token": Token, "userMessage": message });
        request.send(data);
        document.getElementById("chatinput").value = "";
        document.getElementById("chatmainblock").scrollTop = document.getElementById("chatmainblock").scrollHeight;
    }
}

function receiveMessage() {
    var chatselect = document.getElementById("chatselect");
    var chatID = chatselect.options[chatselect.selectedIndex].value;

    if (chatID != "") {
        var request = new XMLHttpRequest();
        var url = "http://jordanscrivo.ga/receiveMessage";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                json = JSON.parse(request.responseText);
                var chatboxcode = defaultstartofchat;

                var updateChatmessages = function(item, index) {
                    chatboxcode = chatboxcode + "<br><p><b>" + item.senderName + "</b> - " + item.messageContent + "</p>";


                };
                json.forEach(updateChatmessages);

                document.getElementById("chatmainblock").innerHTML = chatboxcode;

                setTimeout(receiveMessage, refreshrate);

            } else if (request.status === 401 && request.readyState === 4) {
                alert("Server returned 401");
            } else if (request.readyState === 4 && request.status === 500) {
                alert("Server returned 500");
            } else if (request.status === 204 && request.readyState === 4) {
                document.getElementById("chatmainblock").innerHTML = defaultemptychat;
                setTimeout(receiveMessage, refreshrate);
            }
        }
        var data = JSON.stringify({ "chatID": chatID, "Token": Token });
        request.send(data);
    } else {
        setTimeout(receiveMessage, refreshrate);
    }
    if (scrolled != true) {
        document.getElementById("chatmainblock").scrollTop = document.getElementById("chatmainblock").scrollHeight;

    }

}

function updateMembers(Id) { //change this to use POST
    $("#members").html("");
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                json = JSON.parse(xhttp.responseText);
                var updatemem = function(item, index) {

                        var member = document.createElement('div');
                        member.className = "member";
                        member.id = item.chatID;
                        member.innerHTML = item.memberName;

                        document.getElementById("members").appendChild(member);
                    }
                    //just use for loop?
                json.forEach(updatemem);
            } else if (this.readyState == 4 && this.status == 401) {
                alert('unauthorized');
            }
            //remove these later
            else if (this.readyState == 4 && this.status == 500) {
                alert('Error');
            }
        }
        //change all this to POST getis not a good idea
    xhttp.open("POST", "http://jordanscrivo.ga/getmembers", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({ "chatID": Id, "Token": Token });
    xhttp.send(data);
}