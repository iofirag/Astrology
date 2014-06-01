var database = [];
function User(fullName, email, date, time, like, country) {
	var profile = {
		name : fullName,
		email : email,
		date : date,
		time : time,
		like : like,
		country : country
	};
	return profile;
}


$(document).ready(function() {
	createLocalDB();
});
function createLocalDB() {
	date = [1987, 3, 7];
	database.push(User("avishay hajbi", "avishay@hajbi", date, new Date().getHours(), true, "Israel"));
	date = [1990, 29, 7];
	database.push(User("ofir aghai", "ofir@aghai", date, new Date().getHours(), false, "Italy"));
	date = [1987, 3, 7];
	database.push(User("mosh hai", "mosh@hai", date, new Date().getHours(), true, "Israel"));
	date = [1990, 29, 7];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "England"));
	date = [1978, 11, 5];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "USA"));
	date = [1999, 15, 6];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "Irish"));
	date = [2011, 1, 1];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "Italy"));
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
			datePicker[2] = parseInt("10", datePicker[2]);
		if (datePicker[1] < 10)
			datePicker[1] = parseInt("10", datePicker[1]);
	}
	database.push(User(userName, userEmail, datePicker, new Date().getHours(), JSON.parse("["+obj.innerHTML+"]")[0], userCountry));
	console.table(database);
	getStatistics();
}

var statisticsLike = [];
function getStatistics() {
	statisticsLike = [];
	var yes = 0;
	var no = 0;
	database.forEach(function(obj) {
		if (obj.like)
			yes++;
		else
			no++;
	});
	statisticsLike.push(yes);
	statisticsLike.push(no);

	//add text
	//$("#graph").html('');
	//$("#graph").append("<p>Like: "+statisticsLike[0]+"<br> unlike: "+statisticsLike[1]+"</p>");

	//Get context with jQuery - using jQuery's .get() method.
	//var ctx = $("#CanvasChart").get(0).getContext("2d");

	draw_pie();
	// or function draw_pie()
	console.log("------Like---" + (statisticsLike[0]) + " ---Unlike--" + statisticsLike[1]);

}

function draw_pie() {
	var pieData = [{
		value : statisticsLike[0],
		color : "#FFFFFF"	//true
	}, {
		value : statisticsLike[1],
		color : "#00dfff"	//false
	}];
	var myPie = new Chart(document.getElementById("CanvasChart").getContext("2d")).Pie(pieData);
}
