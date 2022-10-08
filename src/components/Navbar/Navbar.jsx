import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import { SearchContact } from "..";

import styles from "./Navbar.module.css";

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className="row">
					<h1 className={styles.title}>
						<Link to="/contacts">
							<span className={styles.titleLight}>
								<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faContactBook} />
								وب اپلیکیشن مدیریت
							</span>{" "}
							<span className={styles.titleBold}>مخاطبین</span>
						</Link>
					</h1>

					{location.pathname === "/contacts" ? <SearchContact /> : null}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;