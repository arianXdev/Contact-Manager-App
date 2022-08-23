import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Fab } from "@mui/material";

import Contact from "./Contact";

import styles from "./Contacts.module.css";

const Contacts = () => {
	return (
		<>
			<Fab className={styles.Fab}>
				<FontAwesomeIcon icon={faUserPlus} />
			</Fab>
			<div className="container">
				<section className={styles.Contacts}>
					<Contact />
					<Contact />
					<Contact />
					<Contact />
				</section>
			</div>
		</>
	);
};

export default Contacts;
