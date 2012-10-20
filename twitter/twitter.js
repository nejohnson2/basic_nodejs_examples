// Require the module express
var express = require('express')

// create the server
var app = express.createServer()

//listen for incoming stuff on port 3000
app.listen(3000)

var tweets = []

// listen for the 'get' request.  req = the request, res = rend
app.get('/', function(req, res) {
	var title = 'Citizen Cyberscience Insitutute',
	header = 'Welcome to the Citizen Cyberscience Institute'
	
	res.render('index', {
		locals: {
			'title': title,
			'header': header,
			'tweets': tweets,
			stylesheets:['/public/style.css']
		}
	})
	//res.send('Welcome to Node Twitter')	
})

// Handles the a POST request
app.post('/send', express.bodyParser(), function(req, res) {
	// body parser is called middleware; a function that handles incoming data
	// if there is incoming data that matches 'tweet', store it in the array
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet)
		//resends the message if received 
		res.send({status:"ok", message:"Tweet received"})
	} else {
		//no tweet ?
		res.send({status:"nok", message:"No tweet received"})
	}
})

//another get request.  This is like sinatra
app.get('/tweets', function(req,res){
	res.send(tweets)
})


