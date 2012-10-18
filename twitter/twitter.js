// Require the module express
var express = require('express')

// create the server
var app = express.createServer()

//listen for incoming stuff on port 3000
app.listen(3000)

var tweets = []

// listen for the 'get' request.  req = the request, res = rend
app.get('/', function(req, res) {
	res.send('Welcome to Node Twitter')
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


// API test
var http = require('http'),
	assert = require('assert')

var opts = {
	host: 'localhost',
	port: 3000,
	path: '/send',
	method: 'POST',
	headers: {'content-type':'application/x-www-form-urlencoded'}
}

var req = http.request(opts, function(res) {
	res.setEncoding('utf8')
	
	var data = ""
	res.on('data', function(d) {
		data += d
	})
	
	res.on('end', function() {
		assert.strictEqual(data, '{"status":"ok", "message":"Tweet received"}')
	})
})

req.write('tweet=test')
req.end()