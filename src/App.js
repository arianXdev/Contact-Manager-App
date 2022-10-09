import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Import Context
import { ContactContext } from "./context/contactContext";

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

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [contacts, setContacts] = useState([]); // a list of all contacts
	const [filteredContacts, setFilteredContacts] = useState([]);
	const [groups, setGroups] = useState([]);
	const [contact, setContact] = useState({});
	const [contactQuery, setContactQuery] = useState({ text: "" });

	useEffect(() => {
		// Get data from server using Axios
		const fetchData = async () => {
			try {
				setLoading(true); // showing the user loading data from server

				const { data: contactsData } = await getAllContacts();
				const { data: groupsData } = await getAllGroups();

				setContacts(contactsData);
				setFilteredContacts(contactsData);
				setGroups(groupsData);

				setLoading(false);
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const createContactForm = async (event) => {
		event.preventDefault(); // preventing to reload the page after clicking on the Submit button

		try {
			setLoading((prevLoading) => !prevLoading); // the better way to write setLoading(!loading)
			const { status, data: newContact } = await createContact(contact);

			if (status === 201) {
				const allContacts = [...contacts, newContact]; // get all contacts | clone contacts array
				setContacts(allContacts);
				setFilteredContacts(allContacts);

				setContact({});
				setLoading((prevLoading) => !prevLoading); // the better way to write setLoading(!loading)
				navigate("/contacts");
			}
		} catch (err) {
			console.log(err.message);
			setLoading((prevLoading) => !prevLoading); // the better way to write setLoading(!loading)
		}
	};

	const removeContact = (contactId, contactFullName) => {
		MySwal.fire({
			title: "حذف مخاطب",
			text: `آيا از حذف مخاطب ${contactFullName} مطمئن هستید؟`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff0d3e",
			cancelButtonColor: "#a5a5a5",
			confirmButtonText: "بله! حذف كن",
			cancelButtonText: "انصراف",
			customClass: {
				input: "input-custom",
				popup: "popup-custom",
				confirmButton: "confirmButton-custom confirmButton-custom--red",
				cancelButton: "confirmButton-custom confirmButton-custom--gray",
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);

				try {
					const { status } = await deleteContact(contactId);

					if (status === 200) {
						const { data: contactsData } = await getAllContacts();
						setContacts(contactsData);
						setLoading(false);

						MySwal.fire({
							title: "حذف مخاطب انجام شد!",
							text: `مخاطب ${contactFullName} با موفقیت حذف شد.`,
							icon: "success",
							confirmButtonColor: "#0066ff",
							confirmButtonText: "اوکی",
							customClass: {
								popup: "popup-custom",
								confirmButton: "confirmButton-custom confirmButton-custom--blue",
							},
						});
					} else {
						setLoading(false);

						MySwal.fire({
							title: "حذف مخاطب انجام نشد!",
							text: `حذف مخاطب ${contactFullName} با مشکل مواجه شد!`,
							icon: "error",
							confirmButtonColor: "#0066ff",
							confirmButtonText: "اوکی",
							customClass: {
								popup: "popup-custom",
								confirmButton: "confirmButton-custom confirmButton-custom--blue",
							},
						});
					}
				} catch (err) {
					setLoading(false);

					console.log(err.message);

					MySwal.fire({
						title: "حذف مخاطب انجام نشد!",
						text: `حذف مخاطب ${contactFullName} با مشکل مواجه شد!`,
						icon: "error",
						confirmButtonColor: "#0066ff",
						confirmButtonText: "اوکی",
						customClass: {
							popup: "popup-custom",
							confirmButton: "confirmButton-custom confirmButton-custom--blue",
						},
					});
				}
			}
		});
	};

	const onContactChange = (event) => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	const contactSearch = (event) => {
		setContactQuery({ ...contactQuery, text: event.target.value });
		const allContacts = contacts.filter((contact) => contact.fullName.toLowerCase().includes(event.target.value.toLowerCase()));

		setFilteredContacts(allContacts);
	};

	return (
		<ContactContext.Provider
			value={{
				loading,
				setLoading,
				contacts,
				setContacts,
				groups,
				contact,
				filteredContacts,
				setFilteredContacts,
				contactQuery,
				onContactChange,
				deleteContact: removeContact,
				createContact: createContactForm,
				contactSearch,
			}}
		>
			<div className={styles.App}>
				<Navbar />

				<Routes>
					<Route path="/" element={<Navigate to="/contacts" />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/contacts/add" element={<AddContact />} />
					<Route path="/contacts/:contactId" element={<ViewContact />} />
					<Route path="/contacts/edit/:contactId" element={<EditContact />} />
					<Route path="*" element={<EmptyWarning />} />
				</Routes>
			</div>
		</ContactContext.Provider>
	);
};

export default App;
