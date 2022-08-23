import { faUserEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Contact.module.css";

const Contact = () => {
	return (
		<div className={styles.Contact}>
			<div className={styles.ContactRight}>
				<img src="https://placehold.jp/178x178.png" alt="contact" className={styles.ContactImage} />
			</div>
			<div className={styles.ContactLeft}>
				<ul className={styles.ContactInfoList}>
					<li className={styles.ContactItem}>
						<span className={styles.ContactNameLabel}>نام:</span>
						<h3 className={styles.ContactName}>آرین</h3>
					</li>

					<li className={styles.ContactItem}>
						<span className={styles.ContactMobileLabel}>موبایل:</span>
						<h3 className={styles.ContactMobile}>09123456789</h3>
					</li>

					<li className={styles.ContactItem}>
						<span className={styles.ContactEmailLabel}>ایمیل:</span>
						<h3 className={styles.ContactEmail}>example@example.com</h3>
					</li>
				</ul>

				<div className={styles.contactButtons}>
					<button className={`${styles.contactButton} ${styles.contactButtonBlue}`}>
						<FontAwesomeIcon icon={faEye} />
					</button>

					<button className={`${styles.contactButton} ${styles.contactButtonGreen}`}>
						<FontAwesomeIcon icon={faUserEdit} />
					</button>

					<button className={`${styles.contactButton} ${styles.contactButtonRed}`}>
						<FontAwesomeIcon icon={faUserMinus} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
