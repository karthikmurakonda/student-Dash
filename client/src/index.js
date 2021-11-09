import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);