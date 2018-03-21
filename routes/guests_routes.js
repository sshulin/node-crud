var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/guests/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};

		db.collection('guests').findOne(details, (err, item) => {
			if (err) {
				res.send({'error': 'Something went wrong'});
			} else {
				res.send(item);
			}
		});
	});
	app.post('/guests', (req, res) => {
		const guest = {
			forename: req.body.forename,
			surname: req.body.surname,
			patronym: req.body.patronym,
			brooms: req.body.brooms
		};

		db.collection('guests').insert(guest, (err, result) => {
			if (err) {
				res.send({'error': 'Something went wrong'});
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};