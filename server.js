const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbconfig = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(dbconfig.url, (err, db) => {
	if (err) return console.log(err);

	const database = db.db(dbconfig.name);

	require('./routes')(app, database);
	app.listen(port, () => {
		console.log('Listening on http://localhost:' + port);
	});
})