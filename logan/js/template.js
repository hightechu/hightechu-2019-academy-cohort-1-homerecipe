jsonCookie = getCookie("results");
var c = JSON.parse(jsonCookie);
window.location.replace(c.source_url);