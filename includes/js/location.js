var latitude;
var longitude;
var userCountry;
$(document).ready(function() {
		getLocation(); //html5 location
		setTimeout(function(){
			if(!userCountry)
				getIpLocation();
		}, 5000);

});
$(document).on("pageshow","#page_welcome",function(){ 
	setTimeout(function(){
		$('#details_form #date').css("border","none");
		$('#details_form #date').attr("placeholder","Date Of Birth");
		window.location = "#page_home";
	}, 3000);
});
function getIpLocation() {
	$.get("http://ipinfo.io/" + myip, function(response) {
		//console.log(response); country region city loc
		longitude= response.loc.substring(0,response.loc.indexOf(","));
		latitude=response.loc.substring(response.loc.indexOf(",")+1,response.loc.length);
		console.log("IP location - " + longitude+" "+latitude);
		getCountryName(longitude,latitude);
	}, "jsonp");
}
function getLocation() {
	navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
}
function showPosition(position) {
	console.log("HTML5 location " + position.coords.latitude + " " + position.coords.longitude);
	longitude = position.coords.latitude;
	latitude = position.coords.longitude;
	getCountryName(longitude,latitude);
}
function getCountryName(longitude,latitude){
	$.ajax({
		url : 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+longitude+','+latitude+'&sensor=true',
		success : function(data) {
			//console.log(data.results[0].formatted_address);
			/*can also iterate the components for only the city and state*/
			for ( i = 0; i < data.results[4].address_components.length; i++) {
				for ( j = 0; j < data.results[4].address_components[i].types.length; j++) {
					if (data.results[4].address_components[i].types[j] == 'country') {
						var country_code = data.results[4].address_components[i].long_name;
						userCountry = country_code;
						console.log('country_code',country_code);
	}}}}});
}
function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			//alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			//alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			//alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			//alert("An unknown error occurred.");
			break;
	}
	getIpLocation(); //ip location
}
/* // detect key back event
$(document).on("pageshow","#page_astrology",function(){ 
		$(window).on("navigate", function (event, data) {
		  if (data.state.direction == 'back') {
			$.mobile.changePage( "#page_home", { transition: "flip", changeHash: false });
		  }
	});
});
*/
/*
 $(document).bind("mobileinit", function(){
    if (location.hash == '#page_astrology' || location.hash == '#page_statistics') {
       $.mobile.changePage( "#page_home", { transition: "flip", changeHash: false });
    }
});
 */