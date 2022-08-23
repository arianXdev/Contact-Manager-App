import Navbar from "./components/Navbar/Navbar";
import Contacts from "./components/Contacts/Contacts";

import styles from "./App.module.css";

const App = () => {
	return (
		<div className={styles.App}>
			<Navbar />

			<Contacts />
		</div>
	);
};

export default App;
