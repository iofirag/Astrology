var latitude;
var longitude;
var userCountry;
var datePicker;
var userName;
var userEmail;
var currAstrology;
var currDay;
var currMonth;
var currYear;
var comment;
var zodiacSigns = {
	'capricorn' : {
		'name' : 'Capricorn',
		'background' : 'includes/images/zodiacBackgrounds/capricorn.jpg',
		'icon' : 'includes/images/zodiacIcons/capricorn.png'
	},
	'aquarius' : {
		'name' : 'Aquarius',
		'background' : 'includes/images/zodiacBackgrounds/aquarius.jpg',
		'icon' : 'includes/images/zodiacIcons/aquaruis.png'
	},
	'pisces' : {
		'name' : 'Pisces',
		'background' : 'includes/images/zodiacBackgrounds/pisces.jpg',
		'icon' : 'includes/images/zodiacIcons/pisces.png'
	},
	'aries' : {
		'name' : 'Aries',
		'background' : 'includes/images/zodiacBackgrounds/aries.jpg',
		'icon' : 'includes/images/zodiacIcons/aries.png'
	},
	'taurus' : {
		'name' : 'Taurus',
		'background' : 'includes/images/zodiacBackgrounds/taurus.jpg',
		'icon' : 'includes/images/zodiacIcons/taurus.png'
	},
	'gemini' : {
		'name' : 'Gemini',
		'background' : 'includes/images/zodiacBackgrounds/gemini.jpg',
		'icon' : 'includes/images/zodiacIcons/gemini.png'
	},
	'cancer' : {
		'name' : 'Cancer',
		'background' : 'includes/images/zodiacBackgrounds/cancer.jpg',
		'icon' : 'includes/images/zodiacIcons/cancer.png'
	},
	'leo' : {
		'name' : 'Leo',
		'background' : 'includes/images/zodiacBackgrounds/leo.jpg',
		'icon' : 'includes/images/zodiacIcons/leo.png'
	},
	'virgo' : {
		'name' : 'Virgo',
		'background' : 'includes/images/zodiacBackgrounds/virgo.jpg',
		'icon' : 'includes/images/zodiacIcons/virgo.png'
	},
	'libra' : {
		'name' : 'Libra',
		'background' : 'includes/images/zodiacBackgrounds/libra.jpg',
		'icon' : 'includes/images/zodiacIcons/libra.png'
	},
	'scorpio' : {
		'name' : 'Scorpio',
		'background' : 'includes/images/zodiacBackgrounds/scorpio.jpg',
		'icon' : 'includes/images/zodiacIcons/scorpio.png'
	},
	'sagittarius' : {
		'name' : 'Sagittarius',
		'background' : 'includes/images/zodiacBackgrounds/sagittarius.jpg',
		'icon' : 'includes/images/zodiacIcons/sagittarius.png'
	}
};
/* location handl */
$(document).on("pageshow", "#page_welcome", function() {
	setTimeout(function() {
		$('#details_form #date').css("border", "none");
		window.location = "#page_home";
	}, 3000);
});
function getIpLocation() {
	$.get("http://ipinfo.io/" + myip, function(response) {
		//console.log(response); country region city loc
		longitude = response.loc.substring(0, response.loc.indexOf(","));
		latitude = response.loc.substring(response.loc.indexOf(",") + 1, response.loc.length);
		console.log("IP location - " + longitude + " " + latitude);
		getCountryName(longitude, latitude);
	}, "jsonp");
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
}

function showPosition(position) {
	console.log("HTML5 location " + position.coords.latitude + " " + position.coords.longitude);
	longitude = position.coords.latitude;
	latitude = position.coords.longitude;
	getCountryName(longitude, latitude);
}

function getCountryName(longitude, latitude) {
	$.ajax({
		url : 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + longitude + ',' + latitude + '&sensor=true',
		success : function(data) {
			//console.log(data.results[0].formatted_address);
			/*can also iterate the components for only the city and state*/
			for ( i = 0; i < data.results[4].address_components.length; i++) {
				for ( j = 0; j < data.results[4].address_components[i].types.length; j++) {
					if (data.results[4].address_components[i].types[j] == 'country') {
						var country_code = data.results[4].address_components[i].long_name;
						userCountry = country_code;
						console.log('country_code', country_code);
					}
				}
			}
		}
	});
}

function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			//alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			//alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			//alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			//alert("An unknown error occurred.");
			break;
	}
	getIpLocation();
	//ip location
}

/* astrology handl */
$(document).ready(function() {
	getLocation();
	//html5 location
	setTimeout(function() {
		if (!userCountry)
			getIpLocation();
	}, 5000);

	init();
	
});
function init() {
	console.log("init()");
	$("#details_form").submit(function(event) {
		event.preventDefault();
		validate_form();
	}), $('#page_astrology a').bind('click', function() {
		prevPage = "#page_astrology";
		comment = prompt("Please enter your comment", "");
		if (comment == null)
			comment = "No Comment";
		addToDb(this);
	}), $('#details_form #date').bind('click', function() {
		initDatePicker();
		$('#details_form #date').unbind('click');
	}), $('#details_form #date').bind('focus', function() {
		this.type = 'date';
	});
}

function initDatePicker() {
	$('#details_form #date').css("border", "none");
	var now = new Date();
	currDay = ("0" + now.getDate()).slice(-2);
	currMonth = ("0" + (now.getMonth() + 1)).slice(-2);
	currYear = now.getFullYear();
	today = (currYear) + "-" + (currMonth) + "-" + (currDay);
	$('#date').val(today);
	if (currDay < 10)
		currDay = parseInt(currDay, 10);
	// day
	if (currMonth < 10)
		currMonth = parseInt(currMonth, 10);
	// month
	$("#submit").attr("href", "#page_astrology");
}

function validate_form() {
	if (!$('#details_form #date').val()) {
		$('#details_form #date').css("border", "2px solid red");
	} else {
		datePicker = $('#date').val().split("-");
		datePicker[0]; // year
		if (datePicker[1] < 10)
			datePicker[1] = parseInt(datePicker[1], 10);
		// day
		if (datePicker[2] < 10)
			datePicker[2] = parseInt(datePicker[2], 10);
		// month
		userName = $('#full_name').val();
		userEmail = $('#email').val();
		xmlLoader();
	}
}

function xmlLoader() {
	astrologyUrl = "http://www.findyourfate.com/rss/horoscope-astrology-feed.asp?mode=view&todate=" + currMonth + "/" + currDay + "/" + currYear;
	$.ajax({
		url : astrologyUrl,
		dataType : "xml",
		type : 'GET',
		success : function(res) {
			var myXML = res.responseText;
			// This is the part xml2Json comes in.
			var JSONConvertedXML = $.xml2json(myXML);
			//console.log(JSONConvertedXML);
			var zodiac = getZodiac(datePicker[2], datePicker[1]);
			//console.log("getZodiac()="+zodiac.background);
			// return the zodiac sign
			for (var i = 0; i < JSONConvertedXML.channel.item.length; i++) {
				//console.log(JSONConvertedXML.channel.item[i].title);
				if (JSONConvertedXML.channel.item[i].title.indexOf(zodiac.name) != -1) {
					console.log('title', JSONConvertedXML.channel.item[i].title);
					console.log('astrology', JSONConvertedXML.channel.item[i].description);
					currAstrology = JSONConvertedXML.channel.item[i].description;
					$('#astrology').html("");
					$('#astrology').append("<p class='zodiac_name'>" + zodiac.name + "</p>");
					$('#astrology').append("<p class='zodiac_astrology'>" + currAstrology + "</p>");
					$('#page_astrology').css('background-image', 'url(' + zodiac.background + ')');
					$('#page_astrology .zodiac_name').css('background-image', 'url(' + zodiac.icon + ')');
					window.location = "#page_astrology";
					console.log("window.location = #page_astrology");
					//translateText(currAstrology);
					break;
				}
			}
		}
	});
}

var translateKey = "AIzaSyDfOz-UPBbBZFd1S3Qmfo_FPyP-P1lx_Z8";
function translateText(text) {
	var browsrLanguage;
	$.ajax({
		url : "http://ajaxhttpheaders.appspot.com",
		dataType : 'jsonp',
		success : function(headers) {
			browsrLanguage = headers['Accept-Language'].substring(0, 2);
			console.log('browser language', browsrLanguage);
		}
	});
	$.ajax({
		url : "http://avishay.eu5.org/?translate=true&text=hello&from=en&to=iw",
		type : 'GET',
		async : true,
		dataType : 'text',
		//contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
		contentType : "charset=utf-8",
		success : function(res) {
			console.log('res', res);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.log("php translate error");
		}
	});
}

function getZodiac(day, month) {
	if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
		return zodiacSigns.capricorn;
	} else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
		return zodiacSigns.aquarius;
	} else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
		return zodiacSigns.pisces;
	} else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
		return zodiacSigns.aries;
	} else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
		return zodiacSigns.taurus;
	} else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
		return zodiacSigns.gemini;
	} else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
		return zodiacSigns.cancer;
	} else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
		return zodiacSigns.leo;
	} else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
		return zodiacSigns.virgo;
	} else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
		return zodiacSigns.libra;
	} else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
		return zodiacSigns.scorpio;
	} else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
		return zodiacSigns.sagittarius;
	}
}



/* 
 - No. Language Name   Native Language Name    Code
 -
 -1   Afrikaans   Afrikaans           af
 -2   Albanian    Shqip                   sq
 -3   Arabic          عربي            ar
 -4   Armenian    Հայերէն                 hy
 -5   Azerbaijani آذربایجان دیلی          az
 -6   Basque          Euskara                 eu
 -7   Belarusian  Беларуская          be
 -8   Bulgarian   Български           bg
 -9   Catalan         Català                  ca
 -10  Chinese (Simp.) 中文简体                    zh-CN
 -11  Chinese (Trad.) 中文繁體                    zh-TW
 -12  Croatian    Hrvatski            hr
 -13  Czech           Čeština                 cs
 -14  Danish          Dansk                   da
 -15  Dutch           Nederlands          nl
 -16  English         English                 en
 -17  Estonian    Eesti keel          et
 -18  Filipino    Filipino            tl
 -19  Finnish         Suomi                   fi
 -20  French          Français            fr
 -21  Galician    Galego                  gl
 -22  Georgian    ქართული         ka
 -23  German          Deutsch                 de
 -24  Greek           Ελληνικά            el
 -25  Haitian Creole  Kreyòl ayisyen          ht
 -26  Hebrew          עברית                   iw
 -27  Hindi             हिन्दी                       hi
 -28  Hungarian   Magyar                  hu
 -29  Icelandic   Íslenska            is
 -30  Indonesian  Bahasa Indonesia    id
 -31  Irish           Gaeilge             ga
 -32  Italian     Italiano            it
 -33  Japanese    日本語             ja
 -34  Korean      한국어                 ko
 -35  Latvian     Latviešu            lv
 -36  Lithuanian  Lietuvių kalba      lt
 -37  Macedonian  Македонски          mk
 -38  Malay       Malay               ms
 -39  Maltese     Malti               mt
 -40  Norwegian   Norsk               no
 -41  Persian     فارسی               fa
 -42  Polish      Polski              pl
 -43  Portuguese  Português           pt
 -44  Romanian    Română              ro
 -45  Russian     Русский             ru
 -46  Serbian     Српски              sr
 -47  Slovak          Slovenčina          sk
 -48  Slovenian   Slovensko           sl
 -49  Spanish     Español             es
 -50  Swahili     Kiswahili           sw
 -51  Swedish     Svenska             sv
 -52      Thai            ไทย                     th
 -53  Turkish     Türkçe              tr
 -54  Ukrainian   Українська          uk
 -55  Urdu        اردو                    ur
 -56  Vietnamese  Tiếng Việt          vi
 -57  Welsh       Cymraeg             cy
 -58  Yiddish     ייִדיש                  yi 
 -*/