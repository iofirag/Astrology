var date;
$(document).ready(function() {
	initDatePicker();
	datePickerValues();
});
function initDatePicker(){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear() + "-" + (month) + "-" + (day);
	$('#date').val(today);
}
function datePickerValues(){
	date = $('#date').val().split("-");
	if (date[1]<10)
		date[1]=parseInt("10", date[1]);
	if (date[2]<10)
		date[2]=parseInt("10", date[2]);
	xmlLoader();
}
function xmlLoader() {
	var astrologyUrl = "http://www.findyourfate.com/rss/horoscope-astrology-feed.asp?mode=view&todate="+date[1]+"/"+date[2]+"/"+date[0];
	$.ajax({
		url : astrologyUrl,
		dataType : "xml",
		type : 'GET',
		success : function(res) {
			var myXML = res.responseText;
			// This is the part xml2Json comes in.
			var JSONConvertedXML = $.xml2json(myXML);
			//console.log(JSONConvertedXML);
			for (var i = 0; i < JSONConvertedXML.channel.item.length; i++) {
				console.log(JSONConvertedXML.channel.item[i].title);
				console.log(JSONConvertedXML.channel.item[i].description);
			}
		}
	});
}

