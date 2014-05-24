$(document).ready(function() {
	getCountryName(); //ip location
	getLocation(); //html5 location
});
function getCountryName() {
	$.get("http://ipinfo.io/" + myip, function(response) {
		//console.log(response);
		console.log("IP position " + myip + "- " + response.country);
		console.log("IP position " + myip + "- " + response.region);
		console.log("IP position " + myip + "- " + response.city);
	}, "jsonp");
}
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition, errorHandler);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}
function showPosition(position) {
	console.log("HTML5 position " + position.coords.latitude + "    " + position.coords.longitude);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	$.ajax({
		url : 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true',
		success : function(data) {
			console.log(data.results[0].formatted_address);
			/*or you could iterate the components for only the city and state*/
			for ( i = 0; i < data.results[4].address_components.length; i++) {
				for ( j = 0; j < data.results[4].address_components[i].types.length; j++) {
					if (data.results[4].address_components[i].types[j] == 'country') {
						var country_code = data.results[4].address_components[i].long_name;
						console.log(country_code);
	}}}}});
}
function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
	}
}
