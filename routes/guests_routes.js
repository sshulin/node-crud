module.exports = function(app, db) {
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