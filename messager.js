var Token;
var userID;
Token = localStorage.getItem("Token");
userID = localStorage.getItem("userID");

function getMessages(ID){

}

function updateSelecton(){
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

function changeChats(chatID){
  if (chatID == "") {
    document.getElementById("test").innerHTML = 'Select a chat to begin';
  }
  else {
    document.getElementById("test").innerHTML = 'input from option: ' + chatID;
  }
}
