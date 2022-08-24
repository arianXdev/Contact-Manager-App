import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Fab } from "@mui/material";

import Contact from "./Contact";
import Spinner from "../Spinner/Spinner";
import EmptyWarning from "../EmptyWarning/EmptyWarning";

import styles from "./Contacts.module.css";

const Contacts = ({ contacts, loading }) => {
	return (
		<>
			<Fab className={styles.Fab}>
				<FontAwesomeIcon icon={faUserPlus} />
			</Fab>

			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					{contacts.length > 0 ? (
						<section className={styles.Contacts}>
							{contacts.map((c) => (
								<Contact key={c.id} contact={c} />
							))}
						</section>
					) : (
						<EmptyWarning />
					)}
				</div>
			)}
		</>
	);
};

export default Contacts;
