import { Link } from "react-router-dom";
import { faUserEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Contact.module.css";

const Contact = ({ contact: { fullName, email, photo, mobileNumber, group, id }, confirmDeleteContact }) => {
	return (
		<div className={styles.Contact} id={id} group={group}>
			<div className={styles.ContactRight}>
				<img src={photo || "https://placehold.jp/178x178.png"} alt={fullName || "contact"} className={styles.ContactImage} />
			</div>
			<div className={styles.ContactLeft}>
				<ul className={styles.ContactInfoList}>
					<li className={styles.ContactItem}>
						<span className={styles.ContactNameLabel}>نام:</span>
						<h3 className={styles.ContactName}>{fullName || "آرين"}</h3>
					</li>

					<li className={styles.ContactItem}>
						<span className={styles.ContactMobileLabel}>موبایل:</span>
						<h3 className={styles.ContactMobile}>{mobileNumber || "0912345679"}</h3>
					</li>

					<li className={styles.ContactItem}>
						<span className={styles.ContactEmailLabel}>ایمیل:</span>
						<h3 className={styles.ContactEmail}>{email || "exmaple@exmaple.com"}</h3>
					</li>
				</ul>

				<div className={styles.contactButtons}>
					<Link to={`/contacts/${id}`}>
						<button className={`${styles.contactButton} ${styles.contactButtonBlue}`}>
							<FontAwesomeIcon icon={faEye} />
						</button>
					</Link>

					<Link to={`/contacts/edit/${id}`}>
						<button className={`${styles.contactButton} ${styles.contactButtonGreen}`}>
							<FontAwesomeIcon icon={faUserEdit} />
						</button>
					</Link>

					<button className={`${styles.contactButton} ${styles.contactButtonRed}`} onClick={confirmDeleteContact}>
						<FontAwesomeIcon icon={faUserMinus} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
