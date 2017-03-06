//require express
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://innha:magoka@ds119220.mlab.com:19220/innha', (err, database) => {
//MongoClient.connect('mongodb://localhost:27017', (err, database) => {
	if(err) return console.log(err)

	db = database
	
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

console.log('connected')

app.use(express.static(__dirname + '/public'))

console.log('use public')

app.use(bodyParser.urlencoded({extended: true}))

console.log('use body parser urlencoded')

app.use(bodyParser.json())

console.log('use body parser json')

app.get('/', function(req, res) {
	//res.send('Welcome to Node.JS server')
	//res.sendFile(__dirname + '/index.html')
	//console.log('__dirname: ' + __dirname)
	
	db.collection('quotes').find().toArray(function(err, results) {

		if(err) return console.log(err)

		console.log(results)

		res.render('index.ejs', {quotes: results})
	})
})

app.post('/quotes', function(req, res) {
	console.log(req.body)
	
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

console.log('put')

app.put('/quotes', (req, res) => {
	//handle PUT request
	db.collection('quotes')
	.findOneAndUpdate({name: 'Ninmah'}, {
		$set: 
		{
			name: req.body.name,
			quote: req.body.quote
		}
	},	{
		sort: {_id: -1},
		upsert: true
	}, (err, result) => {
		if(err) return res.send(err)
		res.send(result)
	})
})

app.delete('/quotes', (req, res) => {
	db.collection('quotes').findOneAndDelete({name: req.body.name},
	(err, result) => {
		if(err) return res.send(500, err)
		//res.send('Innocent quote got deleted')
		res.send(result)
	})
})