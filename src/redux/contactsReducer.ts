import { ContactDto } from 'src/types/dto/ContactDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DATA_CONTACT } from 'src/__data__';

const initialContacts: ContactDto[] = DATA_CONTACT;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    getFilterContactsByGroupAction(state, action: PayloadAction<ContactDto['id'][]>) {
      return state = initialContacts.filter(({ id }) => (
        action.payload.includes(id)
      ))
    },
    resetFilterContactsByGroupAction(state) {
      return state = initialContacts;
    },
    getContactByNameAction(state, action: PayloadAction<string>) {
      const contactName = action.payload.toLowerCase();
      if (!contactName.length) return initialContacts;
      return state = initialContacts.filter(({ name }) => (
        name.toLowerCase().indexOf(contactName) > -1
      ))
    }
  },
})

export const { getFilterContactsByGroupAction, resetFilterContactsByGroupAction, getContactByNameAction } = contactsSlice.actions;