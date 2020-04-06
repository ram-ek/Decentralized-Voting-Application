//================Frontend=======================================//

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const path = require('path');
const nodemailer = require("nodemailer");


var expressValidator = require('express-validator')
var db = require('./routes/index')
// var methodOverride = require('method-override')

const app = express()
//
app.use(expressValidator())
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(cors());

var expressMongoDb = require('express-mongo-db');

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 * For MongoDB, we basically store the connection URL in config file
 */

var config = require('./config')
app.use(expressMongoDb(config.database.url));

app.use('/db', db )

var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

var index = require('./routes/index')
var users = require('./routes/users')
var voters = require('./routes/voters')

//app.use('/', index)
app.use('/users', users)
app.use('/voters', voters)


var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionStore = new session.MemoryStore;
app.use(cookieParser('keyboard cat'))
app.use(session({
	secret: 'keyboard cat',
	store: sessionStore,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))

app.use(flash())

//Define port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' +port)
})

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/vote',function(req,res){
	// console.log("req received", req.query);
	if (req.query.otp == rand){
		res.sendFile(__dirname + '/votepage/vote.html');
	} 
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

//==================================Mail logic=========================================//
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
	Use your email id and enable access to non secure apps
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});
var rand,mailOptions,host,link;
rand=Math.floor((Math.random() * 1000000) + 54);
app.get('/send',function(req,res){
	rand=Math.floor((Math.random() * 1000000) + 54);
	host=req.get('host');
	// link="http://"+req.get('host')+"/verify?id="+rand;
	mailOptions={
		to : req.query.to,
		subject : "Please confirm your Email account",
		html : "Hello, your OTP is "+rand
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 	if(error){
        	console.log(error);
			res.end("error");
	 	}else{
        	// console.log("Message sent: " + response.message);
			res.end("sent");
    	}
	});
});

app.get('/verify',function(req,res){
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
	// console.log("Domain is matched. Information is from Authentic email");
	console.log(req.query);
	if(req.query.otp==rand)
	{
		console.log("email is verified");
		//res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
		// res.redirect('/vote.html');
		// app.use(express.static(path.join(__dirname, 'votepage')));
		res.send("true");
	}
	else
	{
		console.log("email is not verified");
		// res.end("<h1>Bad Request</h1>");
		res.end("false");
	}
// }
// else
// {
// 	res.end("<h1>Request is from unknown source</h1>");
// }
});

/*--------------------Routing Over----------------------------*/
