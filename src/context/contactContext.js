import { createContext } from "react";

export const ContactContext = createContext({
	loading: false,
	setLOading: () => {}, // only for auto-complete
	contact: [],
	setContact: () => {},
	filteredContacts: [],
	contactQuery: {},
	groups: [],
	onContactChange: () => {},
	deleteContact: () => {},
	updateContact: () => {},
	createContact: () => {},
});