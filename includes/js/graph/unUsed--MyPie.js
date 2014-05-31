var data;
function createDate() {
	// Example Data

	// data = [
	// { label: "Series1",  data: 10},
	// { label: "Series2",  data: 30},
	// { label: "Series3",  data: 90},
	// { label: "Series4",  data: 70},
	// { label: "Series5",  data: 80},
	// { label: "Series6",  data: 110}
	// ];

	// data = [
	// { label: "Series1",  data: [[1,10]]},
	// { label: "Series2",  data: [[1,30]]},
	// { label: "Series3",  data: [[1,90]]},
	// { label: "Series4",  data: [[1,70]]},
	// { label: "Series5",  data: [[1,80]]},
	// { label: "Series6",  data: [[1,0]]}
	// ];
	t = statisticsLike[0];
	f = statisticsLike[1];
	data = [{
		label : "True",
		data : t
	}, {
		label : "False B",
		data : f
	}];

	// Randomly Generated Data

	// data = [], series = Math.floor(Math.random() * 6) + 3;

	// for (var i = 0; i < series; i++) {
	// data[i] = {
	// label : "Series" + (i + 1),
	// data : Math.floor(Math.random() * 100) + 1
	// };
	// }
}

function labelFormatter(label, series) {
	return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}


$(document).ready(function() {
	createDate();
	$.plot(placeholder, data, {
		series : {
			pie : {
				show : true,
				radius : 1,
				label : {
					show : true,
					radius : 2 / 3,
					formatter : labelFormatter,
					threshold : 0.1
				}
			}
		},
		legend : {
			show : false
		}
	});

	setCode(["$.plot('#placeholder', data, {", "    series: {", "        pie: {", "            show: true,", "            radius: 1,", "            label: {", "                show: true,", "                radius: 2/3,", "                formatter: labelFormatter,", "                threshold: 0.1", "            }", "        }", "    },", "    legend: {", "        show: false", "    }", "});"]);
}); 