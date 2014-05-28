var database = [];
<<<<<<< HEAD
function createUser (fullName,email,date,time){
 profile = {
 	name : fullName,
 	email : email,
 	date : date,
 	time : time
=======
function User (fullName,email,date,time,like,country){
 var profile = {
 	name : fullName,
 	email : email,
 	date : date,
 	time : time,
 	like : like,
 	country : country
>>>>>>> d38d78d54ded39652aef3305605e5febe6bee4a1
	};
return profile;
}
$(document).ready(function (){
	createLocalDB();
});
function createLocalDB(){
	date = [1987,3,7];
	database.push(User("avishay hajbi","avishay@hajbi",date,new Date().getHours(),true, "Israel"));
	date = [1990,29,7];
	database.push(User("ofir aghai","ofir@aghai",date,new Date().getHours(),false, "Italy"));
	date = [1987,3,7];
	database.push(User("mosh hai","mosh@hai",date,new Date().getHours(),true, "Israel"));
	date = [1990,29,7];
	database.push(User("david gueta","david@gueta",date,new Date().getHours(),false, "Israel"));
}
function addToDb(obj){
	if (!userName) userName = "User";
	if (!userEmail) userEmail="example@email.com";
	if (!datePicker){
		var now = new Date();
		datePicker=[];
		datePicker[0]= now.getFullYear();
		datePicker[2]= now.getMonth()+1;
		datePicker[1]= now.getDate();
		if (datePicker[2] < 10)datePicker[2] = parseInt("10", datePicker[2]);
		if (datePicker[1] < 10)datePicker[1] = parseInt("10", datePicker[1]);
	}
	database.push(User(userName,userEmail,datePicker,new Date().getHours(),JSON.parse("["+obj.innerHTML+"]")[0],userCountry));
	console.table(database);
	getStatistics();
}
var statisticsLike = [];
function getStatistics(){
	var yes =0;
	var no =0;
	database.forEach(function (obj){
		if(obj.like) yes++;
		else no++;
	});
	statisticsLike.push(yes);
	statisticsLike.push(no);
}
<<<<<<< HEAD

=======
>>>>>>> d38d78d54ded39652aef3305605e5febe6bee4a1
