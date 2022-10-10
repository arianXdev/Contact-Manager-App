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
						setFilteredContacts(contactsData);
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

	const changeContact = (event) => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	const searchContact = (event) => {
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
				changeContact,
				deleteContact: removeContact,
				createContact: createContactForm,
				searchContact,
			}}
		>
			<div className={styles.App}>
				{/* GitHub Badge */}
				<a href="https://github.com/aryanhosseini" target="_blank" className="github-corner" aria-label="View source on GitHub">
					<svg
						width={80}
						height={80}
						viewBox="0 0 250 250"
						style={{ fill: "#151513", color: "#fff", position: "absolute", top: 0, border: 0, left: 0, transform: "scale(-1, 1)" }}
						aria-hidden="true"
					>
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
						<path
							d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
							fill="currentColor"
							style={{ transformOrigin: "130px 106px" }}
							className="octo-arm"
						/>
						<path
							d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
							fill="currentColor"
							className="octo-body"
						/>
					</svg>
					<style
						dangerouslySetInnerHTML={{
							__html: ".github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}",
						}}
					/>
				</a>

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
