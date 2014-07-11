var welcomeText="WELCOME <p class='context'> Astrology Community, is a new way to test statistically whether your daily astrology forecast matches other people with the same birth data as yours. Let's find out weather or not the forecast matching.<p>";
var database = [];
var statisticsLike = [];
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
	readFromJson();
});
function readFromJson() {
	$.getJSON('includes/js/database.json', function(data) {
		for (i in data.users) {
			database.push(data.users[i]);
		}
	});
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
			datePicker[2] = parseInt(datePicker[2], 10);
		if (datePicker[1] < 10)
			datePicker[1] = parseInt(datePicker[1], 10);
	}
	var answer;
	obj.innerHTML == "Good Job" ? answer = true : answer = false;
	database.push(User(userName, userEmail, datePicker, new Date().getHours(), answer, userCountry, comment));
	console.table(database);
	getStatistics();
}

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
	$('#country_name').text(userCountry);
	drawPie();
	console.log("------Like---" + (statisticsLike[0]) + " ---Unlike--" + statisticsLike[1]);
	setTimeout(function(){
		drawPie();
	},500);
}



var canvas;
$(document).ready(function() {
	canvas = document.createElement('canvas');
	canvas.id = "canvas";
	$('#page_statistics div').append(canvas);

	$("#page_statistics .statistics_title").click(function(e) {
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		//console.log(x+" "+y);
		if (y < 38) {// it means that we pressed on top
			if (x < 50) {
				//console.log("false");
			}
			if (x > ($(window).width() - 50)) {
				//console.log("true");
			}
		}
	});
});



function drawPie() {
		var labelFormatter = function labelFormatter(label, series) {
		return "<div class='pieTextState' style='text-align:center; padding:2%;color:white; text-shdow: 0 0 black;'>" +series.data[0][1] + "<br/>" + label +   "<br/> <span class='pieTextAstrology'>Astrology</span></div>";
	};
	var data = [{
		label : "MISTAKE",
		data : statisticsLike[1],
		color : "#2c2048"
	}, {
		label : "CORRECT",
		data : statisticsLike[0],
		color : "#fd0160"
	}];

	$.plot('#placeholder', data, {
		series : {
			pie : {
				show : true,
				radius : 1,
				//innerRadius: 0.125,
				label : {
					show : true,
					radius : 1 / 2,
					formatter : labelFormatter,
					threshold : 0.1
				},
				 stroke: { 
  				    width: 3
  				},
			}
		},
		legend : {
			show : false
		},
		grid : {
			hoverable : false,
			clickable : true
		},
		label : {
			threshold : 15
		}
	});
$("#placeholder").bind("plotclick", function(event, pos, item) {
	$( ".toggle-nav-left" ).on( "click", function() {
	   toggleNav_Left();
	}),
	$( ".toggle-nav-right" ).on( "click", function() {
	  toggleNav_right();
	});
	if (item) {
		if(item.series.label.indexOf("CORRECT") > -1){
			$( ".toggle-nav-left" ).trigger( "click" );
		}
		else if (item.series.label.indexOf("MISTAKE") > -1){
			$( ".toggle-nav-right" ).trigger( "click" );
		}
	}
});
}
