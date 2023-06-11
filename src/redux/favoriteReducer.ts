import { createSlice } from '@reduxjs/toolkit';

import { DATA_CONTACT } from 'src/__data__';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';

const initialFavorite: FavoriteContactsDto = [
  DATA_CONTACT[0].id,
  DATA_CONTACT[1].id,
  DATA_CONTACT[2].id,
  DATA_CONTACT[3].id
];


export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavorite,
  reducers: {},
})

// export const { getFilterContactsByGroupAction, resetFilterContactsByGroupAction, getContactByNameAction } = contactsSlice.actions;