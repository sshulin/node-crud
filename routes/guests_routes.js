module.exports = function(app, db) {
	app.post('/guests', (req, res) => {
		console.log(req.body);
		res.send('Hello');
	})
};