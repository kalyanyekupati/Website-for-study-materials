var express= require('express');
var mangojs = require('mongojs');

var app=express();
/* cString = Link That is Available in Your MangoDB account and copy that and paste it Here.*/
var cString ="mongodb+srv://"Here you have to enter your mangoDB database name and password "@cluster0.tex7j.mongodb.net/<dbname>?retryWrites=true&w=majority"
var db= mangojs(cString,['users']);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){

	res.sendFile(__dirname+"public/index.html")

})
app.get("/registersubmit" , function(req,res){
	var data={
		firstname : req.query.fname,
		email : req.query.email,
		password : req.query.pswd,
		college : req.query.college
	}
    db.users.insert(data, function(err,docs){
    	if(err){
    		res.send("Something Went Wrong. please try again")
    	}
    	else{
    		res.sendFile(__dirname+"/public/login.html")

    	}
    
    	
    })
})

/* storing in the database */

app.get('/loginsubmit' ,function(req,res){
	 var data={
	 	email : req.query.email_id,
	 	password : req.query.pass_word

	 }
	 /* Checking mail and Password */
	 
	 db.users.find(data,function(err,docs){
	 	if(err){
	 		res.send("something went wrong")
	 	}
	 	if(docs.length>0){
	 		res.sendFile(__dirname+"/public/pdfhome.html")
	 	}
	 	else{
	 		res.sendFile(__dirname+"/public/passworderror.html")
	 	}
	 	

	
	 })


})

app.get('/dashboard' ,function(req,res){
	
	
	res.render("first")
})

app.listen(3000, function(){
	console.log("server started")
});
