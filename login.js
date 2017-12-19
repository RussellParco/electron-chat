var json;
var logindone = function(json){
  //change this and the auth api to send the user id as well
  localStorage.setItem("Token", json.Token);
  localStorage.setItem("userID", json.UserID);
  //alert(json.Token);
  document.location.href = "main.html";
}



function startlogin() {
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  login(user, pass, logindone);
}

function login(user, pass, callback){
  var request = new XMLHttpRequest();
  var url = "http://jordanscrivo.ga/auth";
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      json = JSON.parse(request.responseText);
      callback.apply(this,[json]);
      //alert(json.Token);
    } else if (request.status === 401 && request.readyState === 4) {
      alert("Server returned 401");
    } else if (request.readyState === 4 && request.status === 500) {
      alert("Server returned 500");
    }
  }
  var data = JSON.stringify({"username": user, "password": pass});
  request.send(data);
}

//change later
var Token;
var userID;
function getToken(){
  Token = localStorage.getItem("Token");
  userID = localStorage.getItem("userID");
  document.getElementById("Tokenhere").innerHTML = Token;
  document.getElementById("IDhere").innerHTML = userID;
}


function logout(){
  var request = new XMLHttpRequest();
  var url = "http://jordanscrivo.ga/auth";
  request.open("DELETE", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      json = JSON.parse(request.responseText);
      //callback.apply(this,[json]);
      //alert(json.Status);
      localStorage.removeItem("Token");
      localStorage.removeItem("userID");
      document.location.href = "index.html";
    } else if (request.status === 400 && request.readyState === 4) {
      alert("Server returned 400");
    } else if (request.readyState === 4 && request.status === 500) {
      alert("Server returned 500");
    }
  }
  var data = JSON.stringify({"token": Token});
  request.send(data);
}


//HTML5 local storage
//localStorage.setItem("variableName","Text");
// Receiving the data:
//localStorage.getItem("variableName");

function startSignup(){
  var first = document.getElementById("firstname").value;
  var last = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

  if (first == ""){
    alert("The first name field is empty.");
  }
  else if (last == ""){
    alert("The last name field is empty.");
  }
  else if (email == ""){
    alert("The email field is empty.");
  }
  else if (user == ""){
    alert("The username field is empty.");
  }
  else if (pass == ""){
    alert("The password field is empty.");
  }
  else{
    signUp(first, last, email, user, pass);
  }
  //add checks if for password strengh and if all boxes are filled later
  //alert("Finish the api side first");
}

function signUp(first, last, email, user, pass){
  var request = new XMLHttpRequest();
  var url = "http://jordanscrivo.ga/signup";
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      json = JSON.parse(request.responseText);
      //alert(json.Status);
      document.location.href = "index.html";
      //callback.apply(this,[json]);
    } else if (request.status === 400 && request.readyState === 4) {
      alert("Server returned 400");
    } else if (request.readyState === 4 && request.status === 500) {
      alert("Server returned 500");
    }
  }
  var data = JSON.stringify({"firstname": first, "lastname": last, "email": email, "username": user, "password": pass});
  request.send(data);
}
