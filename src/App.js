import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Contacts from "./components/Contacts/Contacts";

import styles from "./App.module.css";

const App = () => {
	// eslint-disable-next-line
	const [getContacts, setContacts] = useState([]);

	return (
		<div className={styles.App}>
			<Navbar />

			<Contacts contacts={getContacts} />
		</div>
	);
};

export default App;
