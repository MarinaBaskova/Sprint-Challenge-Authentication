const db = require('../database/dbConfig');

module.exports = {
	find,
	findByID,
	addNewUser,
	findBy
};

function find() {
	return db('users').select('id', 'username');
}

function findByID(id) {
	return db('users').where({ id }).first();
}

function addNewUser(user) {
	return db('users').insert(user, 'id').then(([ id ]) => {
		const addedUser = findByID(id);
		return addedUser;
	});
}
function findBy(username) {
	return db('users').where(username).first();
}
