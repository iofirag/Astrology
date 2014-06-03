function draw_pie() {
	var myColor = ["#CC0033", "#3333FF"];
	var myData = [statisticsLike[0], statisticsLike[1]];

	function getTotal() {
		var myTotal = 0;
		for (var j = 0; j < myData.length; j++) {
			myTotal += ( typeof myData[j] == 'number') ? myData[j] : 0;
		}
		return myTotal;
	}

	function plotData() {
		var canvas;
		var ctx;
		var lastend = 0;
		var myTotal = getTotal();

		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		canvas.width = 400;
		canvas.height = 300;
		//ctx.attr('width', $(window).width() ); //max width
		//ctx.attr('height', $(window).height() ); //max height
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < myData.length; i++) {
			ctx.fillStyle = myColor[i];
			ctx.beginPath();
			ctx.moveTo(200, 150);
			ctx.arc(200, 150, 150, lastend, lastend + (Math.PI * 2 * (myData[i] / myTotal)), false);
			ctx.lineTo(200, 150);
			ctx.fill();
			lastend += Math.PI * 2 * (myData[i] / myTotal);
		}
	}
	plotData();
}