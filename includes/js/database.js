var database = [];
var welcomeText="W E L C O M E <p class='context'> Astrology Community, is a new way to test statistically whether daily astrology is true for most people that born on my data of birth or wrong. Let's find one another whether the forecast was right.<p>";
function User(fullName, email, date, time, like, country, comment) {
	var profile = {
		name : fullName,
		email : email,
		date : date,
		time : time,
		like : like,
		country : country,
		comment : comment
	};
	return profile;
}


$(document).ready(function() {
	document.getElementById('welcome_text').innerHTML = welcomeText;
	createLocalDB();
});
function createLocalDB() {
	date = [1987, 3, 7];
	database.push(User("avishay hajbi", "avishay@hajbi", date, new Date().getHours(), true, "Israel","abcd"));
	date = [1990, 29, 7];
	database.push(User("ofir aghai", "ofir@aghai", date, new Date().getHours(), false, "Italy","abcd"));
	date = [1987, 3, 7];
	database.push(User("mosh hai", "mosh@hai", date, new Date().getHours(), true, "Israel","abcd"));
	date = [1990, 29, 7];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "England","abcd"));
	date = [1978, 11, 5];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "USA","abcd"));
	date = [1999, 15, 6];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "Irish","abcd"));
	date = [2011, 1, 1];
	database.push(User("david gueta", "david@gueta", date, new Date().getHours(), false, "Italy","abcd"));
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
	database.push(User(userName, userEmail, datePicker, new Date().getHours(), JSON.parse("["+obj.innerHTML+"]")[0], userCountry, comment));
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
	$('#country_name').append("<p>"+userCountry+"</p>");
	draw_pie();
	console.log("------Like---" + (statisticsLike[0]) + " ---Unlike--" + statisticsLike[1]);
}
