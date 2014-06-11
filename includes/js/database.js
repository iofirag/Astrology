var database = [];
function User(fullName, email, date, time, like, country, comment) {
	var user = {
		name : fullName,
		email : email,
		date : date,
		time : time,
		like : like,
		country : country,
		comment : comment
	};
	return user;
}


$(document).ready(function() {
	document.getElementById('welcome_text').innerHTML = welcomeText;
	createLocalDB();
	//readFromJson(); not ready yet
});
function readFromJson(){
	$.getJSON('includes/js/database.json', function(data) {
 	 	console.log('JSON',date);
	});
}
function createLocalDB() {
	database.push(User("avishay hajbi", "avishay@hajbi", [1987, 3, 7], new Date().getHours(), true, "Israel","abcd"));
	database.push(User("ofir aghai", "ofir@aghai", [1990, 29, 7], new Date().getHours(), false, "Italy","abcd"));
	database.push(User("mosh hai", "mosh@hai", [1987, 3, 7], new Date().getHours(), true, "Israel","abcd"));
	database.push(User("david gueta", "david@gueta", [1990, 29, 7], new Date().getHours(), false, "England","abcd"));
	database.push(User("david gueta", "david@gueta", [1978, 11, 5], new Date().getHours(), false, "USA","abcd"));
	database.push(User("david gueta", "david@gueta", [1999, 15, 6], new Date().getHours(), false, "Irish","abcd"));
	database.push(User("david gueta", "david@gueta", [2011, 1, 1], new Date().getHours(), false, "Italy","abcd"));
}

function addToDb(obj) {
	if (!userName)
		userName = "User";
	if (!userEmail)
		userEmail = "example@email.com";
	if (!datePicker) {
		var now = new Date();
		datePicker = [];
		datePicker[0] = now.getFullYear();
		datePicker[2] = now.getMonth() + 1;
		datePicker[1] = now.getDate();
		if (datePicker[2] < 10)
			datePicker[2] = parseInt(datePicker[2],10 );
		if (datePicker[1] < 10)
			datePicker[1] = parseInt(datePicker[1],10 );
	}
	var answer;
	obj.innerHTML == "Good Job" ? answer=true :  answer=false;
	database.push(User(userName, userEmail, datePicker, new Date().getHours(), answer, userCountry, comment));
	console.table(database);
	getStatistics();
}

var statisticsLike = [];
function getStatistics() {
	statisticsLike = [];
	var yes = 0;
	var no = 0;
	database.forEach(function(obj) {
		if (obj.like)  yes++;
		else            no++;
	});
	statisticsLike.push(yes);
	statisticsLike.push(no);
	$('#country_name').html('');
	$('#country_name').append("<span></span><p>"+userCountry+"</p>");
	$('#country_name').css("width",getTextPixel()+30+"px");
	drawPie();
	console.log("------Like---" + (statisticsLike[0]) + " ---Unlike--" + statisticsLike[1]);
}
function getTextPixel(){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext("2d");
	ctx.font = "15px Arial";        
	return ctx.measureText(userCountry).width;
}
