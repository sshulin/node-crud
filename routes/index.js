const guestsRoutes = require('./guests_routes');

module.exports = function(app, db) {
	guestsRoutes(app, db);
}