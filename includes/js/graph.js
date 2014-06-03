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
	myPie = new Chart(document.getElementById("CanvasChart").getContext("2d")).Pie(pieData);
}