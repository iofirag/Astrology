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
        
        //find all true obj
		trueObj = [];
		database.forEach(function(obj) {
			if (obj.like)  trueObj.push(obj);
		});
		console.table(trueObj);
		
		//put all true obj into #true_comments
		trueObj.forEach(function(obj){
			name = obj.name;
			time = obj.time;
			country = obj.country;
			comment = obj.comment;
			console.log("name="+name +"  time="+time +"  country="+country  +"  comment="+comment);
			$('#true_wall').prepend("<section class='user_comment'>    <section>"+name+"</section>    <section>"+time+"w</section>   <section>"+country+"</section>    <section>pic</section>    </section>");
		});
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
                
        //find all true obj
		falseObj = [];
		database.forEach(function(obj) {
			if (!obj.like)  falseObj.push(obj);
		});
		console.table(falseObj);
		
		//put all true obj into #true_comments
		falseObj.forEach(function(obj){
			name = obj.name;
			time = obj.time;
			country = obj.country;
			comment = obj.comment;
			console.log("name="+name +"  time="+time +"  country="+country  +"  comment="+comment);
			$('#false_wall').prepend("<section class='user_comment'>    <section>"+name+"</section>    <section>"+time+"w</section>   <section>"+country+"</section>    <section>pic</section>    </section>");
		});
    }
    //$('#site-wrapper').toggleClass('show-nav');
}