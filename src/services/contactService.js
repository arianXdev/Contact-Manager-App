import axios from "axios";

const SERVER_URL = "http://localhost:9000";

// @desc Get All Contacts
// @route GET http://localhost:9000/contacts
export const getAllContacts = () => {
	const url = `${SERVER_URL}/contacts`;
	return axios.get(url);
};

// @desc Get Contact with contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const getContact = (id) => {
	const url = `${SERVER_URL}/contacts/${id}`;
	return axios.get(url);
};

// @desc Get All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
	const url = `${SERVER_URL}/groups`;
	return axios.get(url);
};

// @desc Get Group with group ID
// @route GET http://localhost:9000/groups/:groupId
export const getGroup = (id) => {
	const url = `${SERVER_URL}/groups/${id}`;
	return axios.get(url);
};
