import React from 'react';
import axios from 'axios';

class Login extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	};

	submitForm = (event) => {
		event.preventDefault();
		const endpoint = 'http://localhost:3300/api/login';

		axios
			.post(endpoint, this.state)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				this.props.history.push('/jokes');
			})
			.catch((err) => {
				console.error('Login Error', err);
			});
	};

	render() {
		return (
			<div className="loginForm">
				<h2>Login</h2>
				<form onSubmit={this.submitForm}>
					<div>
						<label htmlFor="username" />
						<input
							id="username"
							onChange={this.handleChange}
							value={this.state.username}
							type="text"
							placeholder="username"
						/>
					</div>
					<div>
						<label htmlFor="password" />
						<input
							id="password"
							onChange={this.handleChange}
							value={this.state.password}
							type="password"
							placeholder="password"
						/>
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
