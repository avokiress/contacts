import { ContactDto } from 'src/types/dto/ContactDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DATA_CONTACT } from 'src/__data__';

const initialContacts: ContactDto[] = DATA_CONTACT;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    getFilterContactsByGroupAction(state, action: PayloadAction<ContactDto['id'][]>) {
      if (!action.payload.length) {
        return state = initialContacts;
      }
      return state = initialContacts.filter(({ id }) => (
        action.payload.includes(id)
      ))
    },
    resetFilterContactsByGroupAction(state) {
      return state = initialContacts;
    }
  },
})

export const { getFilterContactsByGroupAction, resetFilterContactsByGroupAction } = contactsSlice.actions;