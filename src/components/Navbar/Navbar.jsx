import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook } from "@fortawesome/free-solid-svg-icons";

import { SearchContact } from "..";

import styles from "./Navbar.module.css";

const Navbar = ({ query, search }) => {
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

					<SearchContact query={query} search={search} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
