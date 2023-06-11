import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DATA_GROUP_CONTACT } from 'src/__data__';

const initialGroups: GroupContactsDto[] = DATA_GROUP_CONTACT;

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialGroups,
  reducers: {},
})

// export const { getGroupList } = groupsSlice.actions;