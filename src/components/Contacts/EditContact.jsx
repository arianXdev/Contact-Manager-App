import { useState, useEffect } from "react";

import { getContact, getAllGroups, updateContact } from "../../services/contactService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "..";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./EditContact.module.css";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditContact = ({ forceRender, setForceRender }) => {
	// Initilizing SweetAlert2 For React
	const MySwal = withReactContent(Swal);

	const { contactId } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({
		loading: false,
		contact: {
			fullName: "",
			photo: "",
			mobileNumber: "",
			email: "",
			job: "",
			group: "",
		},
		groups: [],
	});
	// eslint-disable-next-line
	useEffect(() => {
		const fetchData = async () => {
			try {
				setState({ ...state, loading: true });
				const { data: contactData } = await getContact(contactId);
				const { data: groupsData } = await getAllGroups();

				setState({
					...state,
					loading: false,
					contact: contactData,
					groups: groupsData,
				});
			} catch (err) {
				console.log(err.message);

				setState({
					// eslint-disable-next-line
					...state,
					loading: false,
				});
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleSelectImage = async () => {
		const { value: imageURL = state.contact.photo } = await MySwal.fire({
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

		setState({ ...state, contact: { ...state.contact, photo: imageURL } });
	};

	// Event Handler
	const handleSubmitForm = async (event) => {
		event.preventDefault(); // preventing to reload the page after clicking on the Submit button

		try {
			setState({ ...state, loading: true });

			const { data } = await updateContact(state.contact, contactId);
			setState({ ...state, loading: false });

			if (data) {
				setForceRender(!forceRender);
				navigate("/contacts");
			}
		} catch (err) {
			console.log(err.message);
			setState({ ...state, loading: false });
		}
	};

	// Event Handler
	const updateContactInfo = (event) => {
		setState({ ...state, contact: { ...state.contact, [event.target.name]: event.target.value } });
	};

	const { groups, loading, contact } = state;

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

							<form className={styles.EditContactForm} onSubmit={handleSubmitForm}>
								<input type="text" className="input" name="fullName" placeholder="نام" required={true} value={contact.fullName} onChange={updateContactInfo} />
								<input
									type="text"
									className="input"
									name="mobileNumber"
									placeholder="شماره موبایل"
									required={true}
									value={contact.mobileNumber}
									onChange={updateContactInfo}
								/>
								<input type="text" className="input" name="email" placeholder="ایمیل" required={true} value={contact.email} onChange={updateContactInfo} />
								<input type="text" className="input" name="job" placeholder="شغل" required={true} value={contact.job} onChange={updateContactInfo} />

								<select className="select" name="group" value={contact.group} onChange={updateContactInfo}>
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
