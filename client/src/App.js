import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';
import './App.css';

function App(props) {
	return (
		<div className="App">
			<header>
				<NavLink className="navLink" to="/login">
					Login
				</NavLink>
				&nbsp;|&nbsp;
				<NavLink className="navLink" to="/register">
					Register
				</NavLink>
				&nbsp;|&nbsp;
				<NavLink className="navLink" to="/jokes">
					Jokes
				</NavLink>
			</header>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/jokes" render={(props) => <Jokes {...props} />} />
		</div>
	);
}

export default withRouter(App);
