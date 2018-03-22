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
	app.put('/guests/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};
		let guest = {};
		if (req.body.forename) guest.forename = req.body.forename;
		if (req.body.surname) guest.surname = req.body.surname;
		if (req.body.patronym) guest.patronym = req.body.patronym;
		if (req.body.brooms) guest.brooms = req.body.brooms;

		db.collection('guests').findOne(details, (err, item) => {
			if (err) {
				res.send({'error': 'Something went wrong'});
			} else {
				guest = Object.assign(item, guest);
				db.collection('guests').update(details, guest, (err, result) => {
					if (err) {
						res.send({'error': 'Something went wrong'});
					} else {
						res.send(guest);
					}
				});
			}
		});
	});
	app.delete('/guests/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};

		db.collection('guests').remove(details, (err, item) => {
			if (err) {
				res.send({'error': 'Something went wrong'});
			} else {
				res.send('Guest ' + id + ' deleted');
			}
		});
	});
};