import { CssVarsProvider } from "@mui/joy/styles";
import { Button } from "@mui/joy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/Navbar/Navbar";

import styles from "./App.module.css";

const App = () => {
	return (
		<div className={styles.App}>
			<Navbar />
		</div>
	);
};

export default App;
