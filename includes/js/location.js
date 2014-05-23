function getCountryName() {
	$.get("http://ipinfo.io/" + myip, function(response) {
		//console.log(response);
		console.log("IP position " + myip + "- " + response.country);
		console.log("IP position " + myip + "- " + response.region);
		console.log("IP position " + myip + "- " + response.city);
	}, "jsonp");
}


$(document).ready(function() {
	//ip location
	getCountryName();
	//html5 location
	getLocation();
});
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	console.log("HTML5 position " + position.coords.latitude + "    " + position.coords.longitude);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	apiKEY = "AIzaSyDX_ntczz6MggSUcA8d0q7yMrI5Y2TB07g";
	locAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=Israel&bounds="+latitude+","+longitude+"|"+ latitude+","+longitude+"&sensor=false&key="+apiKEY;
	$.ajax({
		type : 'GET',
		url : locAPI,
		dataType : 'json',
		async : false,
		success : function(data) {
			console.log(data);
		}
	});
}
