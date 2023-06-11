import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ContactDto } from 'src/types/dto/ContactDto';
import { contactsSlice } from './contactsReducer';

interface IContactInitialState {
  [key: string]: ContactDto,
}

const groupInitialState: IContactInitialState = {};
const contactsState = contactsSlice.getInitialState();

export const contactSlice = createSlice({
  name: 'contact',
  initialState: groupInitialState,
  reducers: {
    getContactByIdAction(state, action: PayloadAction<ContactDto['id']>) {
      if (!action.payload) return;
      const contactById: ContactDto = contactsState.filter(g => g.id === action.payload)[0]
      if (!state[action.payload]) {
        state[action.payload] = contactById;
      }
    },
  },
})

export const { getContactByIdAction } = contactSlice.actions;