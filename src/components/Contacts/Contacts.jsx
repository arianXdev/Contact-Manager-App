import { useContext } from "react";

// Import Context
import { ContactContext } from "../../context/contactContext";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Fab } from "@mui/material";

import { Contact, Spinner, EmptyWarning } from "..";

import styles from "./Contacts.module.css";

const Contacts = () => {
	// Using Context
	const { loading, contacts, deleteContact } = useContext(ContactContext);

	return (
		<>
			<Link to="/contacts/add">
				<Fab className={styles.Fab}>
					<FontAwesomeIcon icon={faUserPlus} />
				</Fab>
			</Link>

			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					{contacts.length > 0 ? (
						<section className={styles.Contacts}>
							{contacts.map((c) => (
								<Contact key={c.id} contact={c} confirmDeleteContact={() => deleteContact(c.id, c.fullName)} />
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
