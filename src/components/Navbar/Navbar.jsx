import SearchContact from "../SearchContact/SearchContact";

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

					<SearchContact />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
