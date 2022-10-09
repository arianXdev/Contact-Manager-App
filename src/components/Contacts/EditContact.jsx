import { useState, useEffect, useContext } from "react";

// Import Context
import { ContactContext } from "../../context/contactContext";

import { getContact, updateContact } from "../../services/contactService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "..";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./EditContact.module.css";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditContact = () => {
	const { loading, setLoading, contacts, setContacts, setFilteredContacts, groups } = useContext(ContactContext);

	// Initilizing SweetAlert2 For React
	const MySwal = withReactContent(Swal);

	const { contactId } = useParams();
	const navigate = useNavigate();

	const [contact, setContact] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data: contactData } = await getContact(contactId);

				setContact(contactData);
				setLoading(false);
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleSelectImage = async () => {
		const { value: imageURL = contact.photo } = await MySwal.fire({
			input: "url",
			title: "آدرس تصوير",
			inputPlaceholder: "لطفا آدرس تصوير مورد نظر را وارد کنید...",
			confirmButtonText: "انتخاب / آپلود",
			confirmButtonColor: "#0066ff",
			validationMessage: "URL نامعتبر - لطفا آدرس را به درستی وارد کنید...",
			customClass: {
				input: "input-custom",
				popup: "popup-custom",
				confirmButton: "confirmButton-custom confirmButton-custom--blue",
			},
		});

		setContact({ ...contact, photo: imageURL });
	};

	// Event Handler
	const onContactChange = (event) => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	// Event Handler
	const submitForm = async (event) => {
		event.preventDefault(); // preventing to reload the page after clicking on the Submit button

		try {
			setLoading(true);
			const { data: updatedContact, status } = await updateContact(contact, contactId);

			if (status === 200) {
				setLoading(false);

				const allContacts = [...contacts];
				const contactIndex = allContacts.findIndex((c) => c.id === updatedContact.id); // get the index of updated contact

				// finding the contact in all contacts and set it to the updated datsa
				allContacts[contactIndex] = { ...updatedContact };

				setContacts(allContacts);
				setFilteredContacts(allContacts);

				navigate("/contacts");
			}
		} catch (err) {
			console.log(err.message);
			setLoading(false);
		}
	};

	return (
		<main>
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<section className={styles.EditContact}>
						<section className={styles.EditContactRight}>
							<h1 className={styles.EditContactTitle}>
								<FontAwesomeIcon icon={faUserEdit} size="sm" />
								ویرایش مخاطب
							</h1>

							<form className={styles.EditContactForm} onSubmit={submitForm}>
								<input type="text" className="input" name="fullName" placeholder="نام" required={true} value={contact.fullName} onChange={onContactChange} />
								<input
									type="text"
									className="input"
									name="mobileNumber"
									placeholder="شماره موبایل"
									required={true}
									value={contact.mobileNumber}
									onChange={onContactChange}
								/>
								<input type="text" className="input" name="email" placeholder="ایمیل" required={true} value={contact.email} onChange={onContactChange} />
								<input type="text" className="input" name="job" placeholder="شغل" required={true} value={contact.job} onChange={onContactChange} />

								<select className="select" name="group" value={contact.group} onChange={onContactChange}>
									<option value="0">انتخاب گروه</option>
									{groups.length > 0 &&
										groups.map((group) => (
											<option key={group.id} value={group.id}>
												{group.name}
											</option>
										))}
								</select>

								<div className={styles.EditContactButtonGroup}>
									<button type="submit" className="btn btn--green btn--edit btn--w-100">
										<FontAwesomeIcon icon={faUserEdit} />
										ویرایش مخاطب
									</button>

									<button type="button" className="btn btn--cancel btn--w-100" onClick={() => navigate("/contacts")}>
										انصراف
									</button>
								</div>
							</form>
						</section>

						<section className={styles.EditContactLeft}>
							<div className={styles.profilePicture} style={{ padding: contact.photo ? false : 35 }}>
								{contact.photo ? (
									<img src={contact.photo} alt="profile" className={styles.profilePictureImg} />
								) : (
									<FontAwesomeIcon icon={faUserCircle} className={styles.profilePictureIcon} />
								)}
							</div>

							<button className="btn btn--w-100" onClick={handleSelectImage}>
								<FontAwesomeIcon icon={faUpload} />
								انتخاب تصویر
							</button>
						</section>
					</section>
				</div>
			)}
		</main>
	);
};

export default EditContact;
