// JavaScript source code
function searchAJAX() {
    window.location.replace("./project/results page/results.html");
    var location = "https://www.food2fork.com/api/search?key=bfdb2d455f170f5cffb163e37166512e&q=";
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
            var responseText = http_request.responseText;
            var response = JSON.parse(http_request.responseText);
            if('error' in response) {
                alert(response.error.message);
            }
            else {
                setCookie("results", JSON.stringify(response.recipes[0]), 360000000)
                loadDoc("template.html");
            }
        }
    }

    var chk_arr =  document.getElementsByName("Sort");
    var chklength = chk_arr.length;             
    searchList = "";
    for(k=0;k< chklength;k++)
    {
        if(chk_arr[k].checked == true)
        {
            searchList += chk_arr[k].parentElement.innerText;
            searchList += " ";
        }
    } 
    searchList = searchList.substring(0, searchList.length - 1);
    finalURI = encodeURI(location + searchList);
    http_request.open("GET", finalURI, true);
    http_request.send();
}