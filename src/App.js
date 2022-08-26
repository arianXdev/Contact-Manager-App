import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// Import from components/index.jsx
import { Contacts, AddContact, EditContact, ViewContact, Navbar } from "./components";

import styles from "./App.module.css";

const App = () => {
	// eslint-disable-next-line
	const [getContacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(false);

	return (
		<div className={styles.App}>
			<Navbar />

			<Routes>
				<Route path="/" element={<Navigate to="/contacts" />} />
			</Routes>
		</div>
	);
};

export default App;
