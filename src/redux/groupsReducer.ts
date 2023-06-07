import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DATA_GROUP_CONTACT } from 'src/__data__';

const initialGroups: GroupContactsDto[] = DATA_GROUP_CONTACT;

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialGroups,
  reducers: {
    getGroupByIdAction(state, action: PayloadAction<GroupContactsDto['id'] | undefined>) {
      const group = state.filter(g => g.id === action.payload)
      return group;
    },
  },
})

export const { getGroupByIdAction } = groupsSlice.actions;