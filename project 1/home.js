var express= require('express');
var mangojs = require('mongojs');

var app=express();

var cString ="mongodb+srv://kalyanyekupati:kalyan765990@cluster0.tex7j.mongodb.net/<dbname>?retryWrites=true&w=majority"
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

app.get('/loginsubmit' ,function(req,res){
	 var data={
	 	email : req.query.email_id,
	 	password : req.query.pass_word

	 }
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