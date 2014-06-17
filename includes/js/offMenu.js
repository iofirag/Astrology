/* Left Menu */
/*====================================
=            ON DOM READY            =
====================================*/
$(function() {
    $('.toggle-nav-left').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav_Left();
    });
});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function toggleNav_Left() {
	$('#true_wall').empty();
    if ($('#site-wrapper').hasClass('show-nav-left')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav-left');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav-left');
        
        buildCommentPage(true);
    }
    //$('#site-wrapper').toggleClass('show-nav');
}






/* Right Menu */
/*====================================
=            ON DOM READY            =
====================================*/
$(function() {
    $('.toggle-nav-right').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav_right();
    });
});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function toggleNav_right() {
	$('#false_wall').empty();
    if ($('#site-wrapper').hasClass('show-nav-right')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav-right');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav-right');
                
         buildCommentPage(false);
    }
    //$('#site-wrapper').toggleClass('show-nav');
}




function buildCommentPage(bool){
	console.log('buildCommentPage(false);');
	userList = [];
	
	//find all false users
	database.forEach(function(obj) {
		if (obj.like == bool && obj.country == userCountry)  userList.push(obj);
	});
	console.table(userList);
	
	//put all true obj into #true_comments
	userList.forEach(function(obj){
		name = obj.name;
		time = obj.time;
		country = obj.country;
		comment = obj.comment;
		console.log("name="+name +"  time="+time +"  country="+country  +"  comment="+comment);
		
		//post and save 'id' specific from millisecond for every one of post
		var d = new Date();
		post = d.getMilliseconds();
		$('#'+bool+'_wall').prepend("<section class='user_comment'>    <section class='comments_name'>"+name+"</section>    <section class='comments_time'><section class='comments_time_timeIcon'></section><section class='comments_time_timeNumber'>"+time+"w</section><div class='clear'></div></section>  <br>  <section class='comments_location'><section class='comments_location_icon'></section><section class='comments_country_name'>"+country+"</section><div class='clear'></div></section>      <section class='pic_comments' id="+post+"></section>   <br>   <button name='button' class='button_likes'>Likes</button>   <button name='button' class='button_comment'>Comment</button>   </section>");
		
		var random;
		//the random image number
		if (bool==true) random = getRandomInt(1, 17);	//true = 1,2,3 images
		else 			random = getRandomInt(1, 11);	//false = 1,2 images
		$('#'+post).css('background' , "url('includes/images/commentsPhotos/"+bool+random+".jpg') no-repeat");
		// $('#'+post).css('width' , "500px");
		// $('#'+post).css('height' , "340px");
	});
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}