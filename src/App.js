import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Contacts from "./components/Contacts/Contacts";

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
