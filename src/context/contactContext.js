import { createContext } from "react";

export const ContactContext = createContext({
	// Default values
	loading: false,
	setLoading: () => {},
	contacts: [],
	setContacts: () => {},
	groups: [],
	contact: {},
	filteredContacts: [],
	setFilteredContacts: () => {},
	contactQuery: {},

	// Functions and Event Handlers
	onContactChange: () => {},
	deleteContact: () => {},
	createContact: () => {},
	contactSearch: () => {},
});
