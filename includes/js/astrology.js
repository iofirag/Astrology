var date;
var zodiacSigns = {
	'capricorn' : 'Capricorn',
	'aquarius' : 'Aquarius',
	'pisces' : 'Pisces',
	'aries' : 'Aries',
	'taurus' : 'Taurus',
	'gemini' : 'Gemini',
	'cancer' : 'Cancer',
	'leo' : 'Leo',
	'virgo' : 'Virgo',
	'libra' : 'Libra',
	'scorpio' : 'Scorpio',
	'sagittarius' : 'Sagittarius'
};

$(document).ready(function() {
	initDatePicker();
	//separateDatePickerValues();
});

function initDatePicker() {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear() + "-" + (month) + "-" + (day);
	$('#date').val(today);
}

function separateDatePickerValues() {
	date = $('#date').val().split("-");
	if (date[1] < 10) // day
		date[1] = parseInt("10", date[1]);
	if (date[2] < 10) // month
		date[2] = parseInt("10", date[2]);
	xmlLoader();
	return false;
	// should be TRUE to procceed
}

function xmlLoader() {
	astrologyUrl = "http://www.findyourfate.com/rss/horoscope-astrology-feed.asp?mode=view&todate=" + date[1] + "/" + date[2] + "/" + date[0];
	$.ajax({
		url : astrologyUrl,
		dataType : "xml",
		type : 'GET',
		success : function(res) {
			var myXML = res.responseText;
			// This is the part xml2Json comes in.
			var JSONConvertedXML = $.xml2json(myXML);
			//console.log(JSONConvertedXML);
			var zodiac = getZodiac(date[2],date[1]); // return the zodiac sign
			for (var i = 0; i < JSONConvertedXML.channel.item.length; i++) {
				console.log(JSONConvertedXML.channel.item[i].title);
				if (JSONConvertedXML.channel.item[i].title.indexOf(zodiac) != -1){
					console.log(JSONConvertedXML.channel.item[i].description);
				}
				//translateText(JSONConvertedXML.channel.item[i].description); // didn't work correctly yet
			}
		}
	});
}

function translateText(text) {
	$.ajax({
		url : "http://ajaxhttpheaders.appspot.com",
		dataType : 'jsonp',
		success : function(headers) {
			language = headers['Accept-Language'];
			//console.log("browser language"+language);
		}
	});
	// //Call the Google API
	$.ajax({
		type : "GET",
		url : "https://ajax.googleapis.com/ajax/services/language/translate",
		dataType : 'jsonp',
		cache : false,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : "v=1.0&q=" + text + "&langpair=en|iw",
		success : function(iData) {
			console.log("****translated**** "+text + " *************");
		},
		error : function(xhr, ajaxOptions, thrownError) {
		}
	});
}

function getZodiac(day, month) {
	if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {return zodiacSigns.capricorn;}
	else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {return zodiacSigns.aquarius;} 
	else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {return zodiacSigns.pisces;} 
	else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {return zodiacSigns.aries;} 
	else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {return zodiacSigns.taurus;} 
	else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {return zodiacSigns.gemini;} 
	else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {return zodiacSigns.cancer;} 
	else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {return zodiacSigns.leo;} 
	else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {return zodiacSigns.virgo;} 
	else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {return zodiacSigns.libra;}
	else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {return zodiacSigns.scorpio;}
	else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {return zodiacSigns.sagittarius;}
}
