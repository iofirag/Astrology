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