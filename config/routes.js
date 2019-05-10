const axios = require('axios');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const { authenticate } = require('../auth/authenticate');
const dbUsers = require('./users-model');

module.exports = (server) => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
	const newUser = req.body;

	if (!newUser.hasOwnProperty('username') || !newUser.hasOwnProperty('password')) {
		res.status(400).json({ error: 'Please provide name and password  for the user' });
	}

	const hash = bcrypt.hashSync(newUser.password, 10);
	newUser.password = hash;

	dbUsers
		.addNewUser(newUser)
		.then((addedUser) => {
			const token = generateToken(addedUser);
			res.status(201).json({ addedUser, token });
		})
		.catch((err) => {
			res.status(500).json({ error: 'The was an error while saving new user', err });
		});
}

function login(req, res) {
	// implement user login
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' }
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then((response) => {
			res.status(200).json(response.data.results);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}

function generateToken(user) {
	const payload = {
		subject: user.id
	};
	const options = {
		expiresIn: '1h'
	};

	return token.sign(payload, process.env.JWT_SECRET, options);
}
