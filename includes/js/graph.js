var myPie;
function draw_pie() {
	
	// $( "#CanvasChart" ).css( "width", "300px" );
	// $( "#CanvasChart" ).css( "height", "150px" );
	
	var pieData = [{
		value : statisticsLike[0],
		color : "#FFFFFF"	//true
	}, {
		value : statisticsLike[1],
		color : "#00dfff"	//false
	}];
	if (myPie== null)
		myPie = new Chart(document.getElementById("CanvasChart").getContext("2d")).Pie(pieData);
	else {
		document.getElementById("CanvasChart").getContext("2d").Pie(pieData);
		console.log("draw pie -> else");
	}  
}