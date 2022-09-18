import { useState, useEffect } from "react";
// eslint-disable-next-line
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Import from components/index.jsx
import { Contacts, AddContact, EditContact, ViewContact, Navbar } from "./components";
import { createContact, getAllContacts, getAllGroups } from "./services/contactService";

import styles from "./App.module.css";

const App = () => {
	const [getContacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [getGroups, setGroups] = useState([]);
	const [getContact, setContact] = useState({
		fullName: "",
		photo: "",
		mobileNumber: "",
		email: "",
		job: "",
		group: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		// Get data from server using Axios
		const fetchData = async () => {
			try {
				setLoading(true); // showing the user loading data from server

				const { data: contactsData } = await getAllContacts();
				const { data: groupsData } = await getAllGroups();

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

	// Event Handler
	const createContactForm = async (event) => {
		event.preventDefault(); // preventing to reload the page after clicking on the Submit button

		try {
			const { status } = await createContact(getContact);
			if (status === 201) {
				setContact({});
				navigate("/contacts");
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// Event Handler
	const setContactInfo = (event) => {
		setContact({ ...getContact, [event.target.name]: event.target.value });
	};

	return (
		<div className={styles.App}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/contacts" />} />
				<Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} />} />
				<Route
					path="/contacts/add"
					element={<AddContact loading={loading} setContactInfo={setContactInfo} createContactForm={createContactForm} contact={getContact} groups={getGroups} />}
				/>
				<Route path="/contacts/:contactId" element={<ViewContact />} />
				<Route path="/contacts/edit/:contactId" element={<EditContact />} />
			</Routes>
		</div>
	);
};

export default App;
