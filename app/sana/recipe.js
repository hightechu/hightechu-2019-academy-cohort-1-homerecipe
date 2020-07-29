var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

function review() {
  var location = "http://localhost:3000/api/comments";
  var http_request = new XMLHttpRequest();

  http_request.onreadystatechange = function() {
      //A new XMLHttpRequest object starts in state 0
      if (http_request.readyState == 1  ) {
          console.log("Successfully called .open()");
      }
      if (http_request.readyState == 2  ) {
          console.log("Successfully called .send()");
      }
      if (http_request.readyState == 3  ) {
          console.log("The content is starting to come from the server");
      }
      if (http_request.readyState == 4  ) {
          console.log("All the content from the server has been downloaded");
          var response = JSON.parse(http_request.responseText);
          if('error' in response) {
              alert(response.error.message);
          }
          else {
              setCookie("id", response.id, response.ttl)
              alert("Successfully commented!");
          }
      }
    }
  
  var jsonObj = new Object();
  jsonObj.rating = 0;
  var stars1 = document.getElementById("1star");
  var stars2 = document.getElementById("2star");
  var stars3 = document.getElementById("3star");
  var stars4 = document.getElementById("4star");
  var stars5 = document.getElementById("5star");

  if(stars1.checked){
    jsonObj.rating = 1;
  }
  if(stars2.checked){
    jsonObj.rating = 2;
  }
  if(stars3.checked){
    jsonObj.rating = 3;
  }
  if(stars4.checked){
    jsonObj.rating = 4;
  }
  if(stars5.checked){
    jsonObj.rating = 5;
  }
  jsonObj.text = document.getElementById("comments").value;
  jsonObj.author = "";
  postData = JSON.stringify(jsonObj);
  http_request.open("POST", location, true);
  http_request.setRequestHeader("Content-type", "application/json");
  auth = getCookie("id");
  if(auth) {
      http_request.setRequestHeader('Authorization', auth);
  }
  http_request.send(postData);
}