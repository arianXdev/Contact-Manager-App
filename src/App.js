import { useState, useEffect } from "react";
// eslint-disable-next-line
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

// Import from components/index.jsx
import { Contacts, AddContact, EditContact, ViewContact, Navbar } from "./components";

import styles from "./App.module.css";

const App = () => {
	const [getContacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [getGroups, setGroups] = useState([]);

	useEffect(() => {
		// Get data from server using Axios
		const fetchData = async () => {
			try {
				setLoading(true); // showing the user loading data from server

				const { data: contactsData } = await axios.get("http://localhost:9000/contacts");
				const { data: groupsData } = await axios.get("http://localhost:9000/groups");

				setContacts(contactsData);
				setGroups(groupsData);

				setLoading(false);
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className={styles.App}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/contacts" />} />
				<Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} />} />
				<Route path="/contacts/add" element={<AddContact />} />
				<Route path="/contacts/:contactId" element={<ViewContact />} />
				<Route path="/contacts/edit/:contactId" element={<EditContact />} />
			</Routes>
		</div>
	);
};

export default App;
