import { useState, useEffect } from "react";
// eslint-disable-next-line
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Import from components/index.jsx
import { Contacts, AddContact, EditContact, ViewContact, Navbar, EmptyWarning } from "./components";
import { createContact, getAllContacts, getAllGroups, deleteContact } from "./services/contactService";

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import styles from "./App.module.css";

const App = () => {
	// Initilizing SweetAlert2 For React
	const MySwal = withReactContent(Swal);

	const [loading, setLoading] = useState(false);
	const [forceRender, setForceRender] = useState(false);
	const [getContacts, setContacts] = useState([]);
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

	useEffect(() => {
		// Get data from server using Axios
		const fetchData = async () => {
			try {
				setLoading(true); // showing the user loading data from server

				const { data: contactsData } = await getAllContacts();

				setContacts(contactsData);

				setLoading(false);
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, [forceRender]); // when forceRender changed, run the code above

	// Event Handler
	const createContactForm = async (event) => {
		event.preventDefault(); // preventing to reload the page after clicking on the Submit button

		try {
			const { status } = await createContact(getContact);
			if (status === 201) {
				setContact({});
				setForceRender(!forceRender);
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

	const confirmDeleteContact = (contactId, contactFullName) => {
		MySwal.fire({
			title: "حذف مخاطب",
			text: `آيا از حذف مخاطب ${contactFullName} مطمئن هستید؟`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff0d3e",
			cancelButtonColor: "#a5a5a5",
			confirmButtonText: "بله! حذف كن",
			cancelButtonText: "انصراف",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "حذف مخاطب انجام شد!",
					text: `مخاطب ${contactFullName} با موفقیت حذف شد.`,
					icon: "success",
					confirmButtonColor: "#0066ff",
					confirmButtonText: "اوکی",
				});

				handleDeleteContact(contactId);
			}
		});
	};

	const handleDeleteContact = async (contactId) => {
		try {
			setLoading(true);
			const response = await deleteContact(contactId);
			if (response) {
				const { data: contactsData } = await getAllContacts();
				setContacts(contactsData);
				setLoading(false);
			}
		} catch (err) {
			console.log(err.message);
			setLoading(false);
		}
	};

	return (
		<div className={styles.App}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/contacts" />} />
				<Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} confirmDeleteContact={confirmDeleteContact} />} />
				<Route
					path="/contacts/add"
					element={<AddContact loading={loading} setContactInfo={setContactInfo} createContactForm={createContactForm} contact={getContact} groups={getGroups} />}
				/>
				<Route path="/contacts/:contactId" element={<ViewContact />} />
				<Route path="/contacts/edit/:contactId" element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
				<Route path="*" element={<EmptyWarning />} />
			</Routes>
		</div>
	);
};

export default App;
