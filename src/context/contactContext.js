import { createContext } from "react";


export const ContactContext = createContext({
	// Default values
	loading: false,
	setLoading: () => {},
	contacts: [],
	filteredContacts: [],
	groups: [],
	contact: {},
	setContact: () => {},
	contactQuery: {},
	
	// Functions and Event Handlers
	onContactChange: () => {},
	deleteContact: () => {},
	updateContact: () => {},
	createContact: () => {},
	contactSearch: () => {}
});