import { useState } from "react";

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

			<Contacts contacts={getContacts} loading={loading} />
		</div>
	);
};

export default App;
