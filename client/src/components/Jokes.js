import React from 'react';
import axios from 'axios';

import checkAuth from './CheckAuth';

class Jokes extends React.Component {
	state = {
		jokes: [],
		loggedIn: false
	};

	componentDidMount() {
		const endpoint = 'http://localhost:3300/api/jokes';
		axios
			.get(endpoint)
			.then((res) => {
				this.setState({ jokes: res.data, loggedIn: true });
			})
			.catch((err) => console.error(err));
	}

	logOut = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		this.setState({ loggedIn: false });
		this.props.history.push('/login');
	};

	render() {
		return (
			<div className="jokes">
				<button className="logout" onClick={this.logOut}>
					Log Out
				</button>
				<h2>Dad Jokes</h2>
				<div>
					{this.state.jokes.map((joke) => (
						<p className="joke" key={joke.id}>
							{joke.joke}
						</p>
					))}
				</div>
			</div>
		);
	}
}

export default checkAuth(Jokes);
