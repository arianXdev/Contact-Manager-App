import { useContext } from "react";

// Import Context
import { ContactContext } from "../../context/contactContext";

import { CssVarsProvider } from "@mui/joy";
import { TextField, Button } from "@mui/joy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./SearchContact.module.css";

const SearchContact = () => {
	// Using Context
	const {contactQuery: query, contactSearch: search } = useContext(ContactContext);

	return (
		<CssVarsProvider>
			<div className={styles.searchBar}>
				<TextField className={styles.searchInput} variant="solid" size="sm" placeholder="جستجوی مخاطب..." fullWidth value={query.text} onChange={search} />

				<Button className={styles.searchBtn} size="sm">
					<FontAwesomeIcon icon={faSearch} />
				</Button>
			</div>
		</CssVarsProvider>
	);
};

export default SearchContact;
