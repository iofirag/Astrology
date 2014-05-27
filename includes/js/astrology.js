var datePicker;
var currAstrology;
var currDay;
var currMonth;
var currYear;
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
});

function initDatePicker() {
	var now = new Date();
	currDay = ("0" + now.getDate()).slice(-2);
	currMonth = ("0" + (now.getMonth() + 1)).slice(-2);
	currYear = now.getFullYear();
	today = (currYear) + "-" + (currMonth) + "-" + (currDay);
	$('#date').val(today);
	if (currDay < 10)currDay = parseInt("10", currDay);// day
	if (currMonth < 10)currMonth = parseInt("10", currMonth);// month
}

function separateDatePickerValues() {
	datePicker = $('#date').val().split("-");
	datePicker[0] = new Date().getFullYear(); // year
	if (datePicker[1] < 10)datePicker[1] = parseInt("10", datePicker[1]);// day
	if (datePicker[2] < 10)datePicker[2] = parseInt("10", datePicker[2]);// month
	xmlLoader();
	return false;// should be TRUE to procceed
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
			// return the zodiac sign
			for (var i = 0; i < JSONConvertedXML.channel.item.length; i++) {
				if (JSONConvertedXML.channel.item[i].title.indexOf(zodiac) != -1) {
					console.log('title',JSONConvertedXML.channel.item[i].title);
					console.log('astrology',JSONConvertedXML.channel.item[i].description);
					currAstrology=JSONConvertedXML.channel.item[i].description;
					$('#astrology').html('');
					$('#astrology').append("<p>"+zodiac+"</p>");
					$('#astrology').append("<p>"+currAstrology+"</p>");
					translateText(currAstrology);
					break;
	}}}});
}
var translateKey = "AIzaSyDfOz-UPBbBZFd1S3Qmfo_FPyP-P1lx_Z8";
function translateText(text) { 
	var browsrLanguage;
	$.ajax({
		url : "http://ajaxhttpheaders.appspot.com",
		dataType : 'jsonp',
		success : function(headers) {
			browsrLanguage = headers['Accept-Language'].substring(0,2);
			console.log('browser language',browsrLanguage);
		}
	});
	//translateByAjax(text);
}
function translateByAjax(text){
 	$.ajax({
		type : "GET",
		url : "https://www.googleapis.com/language/translate/v2?key="+translateKey+"&source=en&target=de&q=Hello",
		dataType : 'jsonp',
		cache : false,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		//data : "key="+translateKey+"&source=en&target=de&q=Hello",
		success : function(res) {
			console.log('res', res.data.translations[0].translatedText);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			console.log("AJAX error :" + errorThrown);
		}
	});

	$.get("https://www.googleapis.com/language/translate/v2", {
		key : translateKey,
		source : "en",
		target : "fr",
		q : "hello"
	}, function(res) {
		console.log(res.data.translations[0].translatedText);
	}, "json").fail(function(jqXHR, textStatus, errorThrown) {
		console.log("GET error :" + errorThrown);
	});
 }
function getZodiac(day, month) {
	if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {return zodiacSigns.capricorn;
	} else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {return zodiacSigns.aquarius;
	} else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {return zodiacSigns.pisces;
	} else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {return zodiacSigns.aries;
	} else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {return zodiacSigns.taurus;
	} else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {return zodiacSigns.gemini;
	} else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {return zodiacSigns.cancer;
	} else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {return zodiacSigns.leo;
	} else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {return zodiacSigns.virgo;
	} else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {return zodiacSigns.libra;
	} else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {return zodiacSigns.scorpio;
	} else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {return zodiacSigns.sagittarius;}
}

/* 
 No. Language Name   Native Language Name    Code

1   Afrikaans   Afrikaans           af
2   Albanian    Shqip                   sq
3   Arabic          عربي            ar
4   Armenian    Հայերէն                 hy
5   Azerbaijani آذربایجان دیلی          az
6   Basque          Euskara                 eu
7   Belarusian  Беларуская          be
8   Bulgarian   Български           bg
9   Catalan         Català                  ca
10  Chinese (Simp.) 中文简体                    zh-CN
11  Chinese (Trad.) 中文繁體                    zh-TW
12  Croatian    Hrvatski            hr
13  Czech           Čeština                 cs
14  Danish          Dansk                   da
15  Dutch           Nederlands          nl
16  English         English                 en
17  Estonian    Eesti keel          et
18  Filipino    Filipino            tl
19  Finnish         Suomi                   fi
20  French          Français            fr
21  Galician    Galego                  gl
22  Georgian    ქართული         ka
23  German          Deutsch                 de
24  Greek           Ελληνικά            el
25  Haitian Creole  Kreyòl ayisyen          ht
26  Hebrew          עברית                   iw
27  Hindi             हिन्दी                       hi
28  Hungarian   Magyar                  hu
29  Icelandic   Íslenska            is
30  Indonesian  Bahasa Indonesia    id
31  Irish           Gaeilge             ga
32  Italian     Italiano            it
33  Japanese    日本語             ja
34  Korean      한국어                 ko
35  Latvian     Latviešu            lv
36  Lithuanian  Lietuvių kalba      lt
37  Macedonian  Македонски          mk
38  Malay       Malay               ms
39  Maltese     Malti               mt
40  Norwegian   Norsk               no
41  Persian     فارسی               fa
42  Polish      Polski              pl
43  Portuguese  Português           pt
44  Romanian    Română              ro
45  Russian     Русский             ru
46  Serbian     Српски              sr
47  Slovak          Slovenčina          sk
48  Slovenian   Slovensko           sl
49  Spanish     Español             es
50  Swahili     Kiswahili           sw
51  Swedish     Svenska             sv
52      Thai            ไทย                     th
53  Turkish     Türkçe              tr
54  Ukrainian   Українська          uk
55  Urdu        اردو                    ur
56  Vietnamese  Tiếng Việt          vi
57  Welsh       Cymraeg             cy
58  Yiddish     ייִדיש                  yi 
*/