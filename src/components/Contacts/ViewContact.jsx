import { useState, useEffect, useContext } from "react";

// Import Context
import { ContactContext } from "../../context/contactContext";

import { Link, useParams } from "react-router-dom";

import { getContact, getGroup } from "../../services/contactService";
import { Spinner, EmptyWarning } from "..";

import styles from "./ViewContact.module.css";

const ViewContact = () => {
	// Using COntext
	const { loading, setLoading } = useContext(ContactContext);

	// Getting the Contact ID from Browser URL
	const { contactId } = useParams();
	const [state, setState] = useState({
		contact: {},
		group: {},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const { data: contactData } = await getContact(contactId);
				const { data: groupData } = await getGroup(contactData.group);

				setLoading(false);
				setState({
					...state,
					contact: contactData,
					group: groupData,
				});
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	const { contact, group } = state;

	return (
		<main>
			{!loading ? (
				<>
					{Object.keys(contact).length !== 0 ? (
						<div className="container">
							<section className={styles.ViewContact}>
								<section className={styles.ViewContactRight}>
									<div className={styles.profilePicture}>
										<img src={contact.photo || "https://placehold.jp/178x178.png"} alt="profile" className={styles.profilePictureImg} />
									</div>
								</section>

								<section className={styles.ViewContactLeft}>
									<ul className={styles.ContactInfoList}>
										<li className={styles.ContactItem}>
											<span className={styles.ContactNameLabel}>نام:</span>
											<h3 className={styles.ContactName}>{contact.fullName}</h3>
										</li>
										<li className={styles.ContactItem}>
											<span className={styles.ContactMobileLabel}>موبایل:</span>
											<h3 className={styles.ContactMobile}>{contact.mobileNumber}</h3>
										</li>
										<li className={styles.ContactItem}>
											<span className={styles.ContactEmailLabel}>ایمیل:</span>
											<h3 className={styles.ContactEmail}>{contact.email}</h3>
										</li>
										<li className={styles.ContactItem}>
											<span className={styles.ContactJobLabel}>شغل:</span>
											<h3 className={styles.ContactJob}>{contact.job}</h3>
										</li>
										<li className={styles.ContactItem}>
											<span className={styles.ContactGroupLabel}>گروه:</span>
											<h3 className={styles.ContactGroup}>{group.name}</h3>
										</li>
									</ul>

									<Link to="/contacts" style={{ marginTop: 30 }}>
										<button className="btn btn--cancel btn--w-100">
											برگشت به صفحه اصلی
											<ion-icon name="arrow-redo-outline" style={{ marginRight: 5, fontSize: 20 }}></ion-icon>
										</button>
									</Link>
								</section>
							</section>
						</div>
					) : (
						<EmptyWarning />
					)}
				</>
			) : (
				<Spinner />
			)}
		</main>
	);
};

export default ViewContact;