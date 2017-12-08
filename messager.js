var Token;
var userID;
Token = localStorage.getItem("Token");
userID = localStorage.getItem("userID");

function getMessages(ID){

}

function updateSelecton(){  //change this to use POST
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
      }
      //just use for loop?
      json.forEach(updateChats);
    }
    else if (this.readyState == 4 && this.status == 401){
      alert('unauthorized');
    }
    //remove these later
    else if (this.readyState == 4 && this.status == 500){
      alert('Error');
    }
  }
  //change all this to POST getis not a good idea
  xhttp.open("GET", "http://jordanscrivo.ga/chat?token="+Token, true);
  xhttp.send();
}

function changeChats(chatID){ //change or remove this
  if (chatID == "") {
    document.getElementById("test").innerHTML = 'Select a chat to begin';
  }
  else {
    document.getElementById("test").innerHTML = 'input from option: ' + chatID;
  }
}

function createChat() {
  var newChatname = document.getElementById("createchatname").value;

  if (newChatname == ""){
    alert("Please enter a chat name");
  }
  else {
    var request = new XMLHttpRequest();
    var url = "http://jordanscrivo.ga/createchat";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
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
    var data = JSON.stringify({"newChatname": newChatname, "Token": Token});
    request.send(data);

    document.getElementById("createchatname").value = "";
  }
}

function addMember() {
  var memberUsername = document.getElementById("addmemberusername").value;
  var chatselect = document.getElementById("chatselect");
  var chatID = chatselect.options[ chatselect.selectedIndex ].value;

  if (memberUsername == ""){
    alert("Please enter a username");
  } else if (chatID == ""){
    alert("Please select a chat before attempting to add a member");
  }
  else {
    var request = new XMLHttpRequest();
    var url = "http://jordanscrivo.ga/addmember";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
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
        alert("User does not exist or is already a member of this chat");
      }
    }
    var data = JSON.stringify({"chatID": chatID, "Token": Token, "memberUsername":memberUsername});
    request.send(data);
    document.getElementById("addmemberusername").value = "";
  }
}
