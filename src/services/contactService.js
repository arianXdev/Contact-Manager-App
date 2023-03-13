import axios from "axios";

const SERVER_URL = "https://notesapi.arianh.ir/index.php";

// @desc Get All Contacts
// @route GET http://localhost:9000/contacts
export const getAllContacts = () => {
	const url = `${SERVER_URL}/contacts`;
	return axios.get(url);
};

// @desc Get Contact with contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
	const url = `${SERVER_URL}/contacts/${contactId}`;
	return axios.get(url);
};

// @desc Get All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
	const url = `${SERVER_URL}/groups`;
	return axios.get(url);
};

// @desc Create a new contact
// @route POST http://localhost:9000/contacts
export const createContact = (contact) => {
	const url = `${SERVER_URL}/contacts`;
	return axios.post(url, contact);
};

// @desc Update a contact
// @route PUT http://localhost:9000/contacts
export const updateContact = (contact, contactId) => {
	const url = `${SERVER_URL}/contacts/${contactId}`;
	return axios.put(url, contact);
};

// @desc Delete a contact
// @route DELETE http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
	const url = `${SERVER_URL}/contacts/${contactId}`;
	return axios.delete(url);
};
