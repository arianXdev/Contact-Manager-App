import { CssVarsProvider } from "@mui/joy/styles";
import { Button } from "@mui/joy";

import styles from "./App.module.css";

const App = () => {
	return (
		<div className={styles.App}>
			<h1>وب اپلیکیشن مدیریت مخاطبین</h1>
			<CssVarsProvider>
				<Button>Click</Button>
			</CssVarsProvider>
		</div>
	);
};

export default App;
