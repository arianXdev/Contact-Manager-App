import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faUpload, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "..";

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import styles from "./AddContact.module.css";

const AddContact = ({ loading, contact, setContactInfo, groups, createContactForm }) => {
	// Initilizing SweetAlert2 For React
	const MySwal = withReactContent(Swal);

	const [profileImage, setProfileImage] = useState("");
	const navigate = useNavigate();

	const handleSelectImage = async () => {
		const { value: imageURL } = await MySwal.fire({
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

		setProfileImage(imageURL);
		contact.photo = `${imageURL}`;
	};

	return (
		<main>
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<section className={styles.AddContact}>
						<section className={styles.AddContactRight}>
							<h1 className={styles.AddContactTitle}>
								<FontAwesomeIcon icon={faUserPlus} size="sm" />
								ساخت مخاطب جدید
							</h1>

							<form className={styles.AddContactForm} onSubmit={createContactForm}>
								<input type="text" className="input" name="fullName" placeholder="نام" required={true} value={contact.fullName} onChange={setContactInfo} />
								<input
									type="text"
									className="input"
									name="mobileNumber"
									placeholder="شماره موبایل"
									required={true}
									value={contact.mobileNumber}
									onChange={setContactInfo}
								/>
								<input type="text" className="input" name="email" placeholder="ایمیل" required={true} value={contact.email} onChange={setContactInfo} />
								<input type="text" className="input" name="job" placeholder="شغل" required={true} value={contact.job} onChange={setContactInfo} />

								<select className="select" name="group" value={contact.group} onChange={setContactInfo}>
									<option value="0">انتخاب گروه</option>
									{groups.length > 0 &&
										groups.map((group) => (
											<option key={group.id} value={group.id}>
												{group.name}
											</option>
										))}
								</select>

								<div className={styles.AddContactButtonGroup}>
									<button type="submit" className="btn btn--blue btn--add btn--w-100">
										<FontAwesomeIcon icon={faUserPlus} />
										ساخت مخاطب
									</button>

									<button type="button" className="btn btn--cancel btn--w-100" onClick={() => navigate("/")}>
										انصراف
									</button>
								</div>
							</form>
						</section>

						<section className={styles.AddContactLeft}>
							<div className={styles.profilePicture} style={{ padding: profileImage ? false : 35 }}>
								{profileImage ? (
									<img src={profileImage} alt="profile" className={styles.profilePictureImg} />
								) : (
									<FontAwesomeIcon icon={faUserCircle} className={styles.profilePictureIcon} />
								)}
							</div>

							<button className="btn" onClick={handleSelectImage}>
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

export default AddContact;
