import { CssVarsProvider } from "@mui/joy";
import { TextField, Button } from "@mui/joy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className="row">
					<h1 className={styles.title}>
						<a href=".">
							<span className={styles.titleLight}>وب اپلیکیشن مدیریت</span> <span className={styles.titleBold}>مخاطبین</span>
						</a>
					</h1>

					<CssVarsProvider>
						<div className={styles.searchBar}>
							<TextField className={styles.searchInput} variant="solid" size="sm" placeholder="جستجوی مخاطب..." fullWidth />

							<Button className={styles.searchBtn} size="sm">
								<FontAwesomeIcon icon={faSearch} />
							</Button>
						</div>
					</CssVarsProvider>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
