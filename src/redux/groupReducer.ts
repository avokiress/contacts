import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { groupsSlice } from './groupsReducer';

interface IGroupInitialState {
  [key: string]: GroupContactsDto,
}

const groupInitialState: IGroupInitialState = {};
const groupsState = groupsSlice.getInitialState();

export const groupSlice = createSlice({
  name: 'group',
  initialState: groupInitialState,
  reducers: {
    getGroupByIdAction(state, action: PayloadAction<GroupContactsDto['id']>) {
      if (!action.payload) return;
      const groupById: GroupContactsDto = groupsState.filter(g => g.id === action.payload)[0]
      state[action.payload] = groupById;
    },
  },
})

export const { getGroupByIdAction } = groupSlice.actions;