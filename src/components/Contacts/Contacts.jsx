import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Fab } from "@mui/material";

import Contact from "./Contact";
import Spinner from "../Spinner/Spinner";

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
						<div className={styles.emptyWarning}>
							<img src={require("../../assets/images/No-Data.gif")} alt="No Data" />
							<p>هیچ مخاطبی وجود ندارد...</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Contacts;
