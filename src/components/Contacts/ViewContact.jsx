import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { getContact, getGroup } from "../../services/contactService";
import { Spinner, EmptyWarning } from "..";

import styles from "./ViewContact.module.css";

const ViewContact = () => {
	// Getting the Contact ID from Browser URL
	const { contactId } = useParams();
	const [state, setState] = useState({
		loading: false,
		contact: {},
		group: {},
	});
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setState({
					...state,
					loading: true,
				});

				const { data: contactData } = await getContact(contactId);
				const { data: groupData } = await getGroup(contactData.group);

				setState({
					...state,
					loading: false,
					contact: contactData,
					group: groupData,
				});
				setNotFound(false);
			} catch (err) {
				setNotFound(true);
				console.log(err.message);
				setState({
					...state,
					loading: false,
				});
			}
		};

		fetchData();
	}, []);

	const { loading, contact, group } = state;

	return (
		<main>
			{notFound == false ? (
				<div className="container">
					<section className={styles.ViewContact}>
						<section className={styles.ViewContactRight}>
							<div className={styles.profilePicture}>
								<img src={contact.photo || "https://placehold.jp/178x178.png"} alt="profile-picture" className={styles.profilePictureImg} />
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

							<Link to="/contacts" style={{ marginRight: "auto", marginTop: 30 }}>
								<button className="btn btn--cancel" style={{ width: "100%" }}>
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
		</main>
	);
};

export default ViewContact;
