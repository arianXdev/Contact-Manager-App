import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { getContact, getGroup } from "../../services/contactService";
import { Spinner } from "..";

import styles from "./ViewContact.module.css";

const ViewContact = () => {
	// Getting the Contact ID from Browser URL
	const { contactId } = useParams();
	const [state, setState] = useState({
		loading: false,
		contact: {},
		group: {},
	});

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
			} catch (err) {
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
		<>
			{contact ? (
				<div className="container">
					<section className={styles.ViewContact}></section>
				</div>
			) : (
				<h1>اطلاعاتی پیدا نشد!</h1>
			)}
		</>
	);
};

export default ViewContact;
