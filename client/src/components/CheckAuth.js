import React from 'react';
import axios from 'axios';

axios.interceptors.request.use(
	function(requestConfig) {
		requestConfig.headers.authorization = localStorage.getItem('token');

		return requestConfig;
	},
	function(error) {
		return Promise.reject(error);
	}
);

export default function(Component) {
	return class Authenticated extends React.Component {
		render() {
			const token = localStorage.getItem('token');
			const notLoggedIn = <h3>Please login to see the jokes</h3>;

			return <div>{token ? <Component {...this.props} /> : notLoggedIn}</div>;
		}
	};
}
