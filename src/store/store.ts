import { makeAutoObservable } from 'mobx'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';

import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

const initialContacts: ContactDto[] = DATA_CONTACT;
const initialGroups: GroupContactsDto[] = DATA_GROUP_CONTACT;
const initialGroup: GroupContactsDto = {};
const initialContact: ContactDto = {
  id: '',
  phone: '',
  name: '',
  birthday: '',
  address: '',
  photo: ''
};
const initialFavorite: FavoriteContactsDto = [
  DATA_CONTACT[0].id,
  DATA_CONTACT[1].id,
  DATA_CONTACT[2].id,
  DATA_CONTACT[3].id
];


export const store = makeAutoObservable({
  contacts: initialContacts,
  groups: initialGroups,
  group: initialGroup,
  contact: initialContact,
  favorite: initialFavorite,

  getContactsGroupByIdAction(__id: GroupContactsDto['id']) {
    console.log('ACTION getGroupById');
    store.group = store.groups.filter(g => g.id === __id)[0]
  },

  getContactByNameAction(__name: string) {
    console.log('ACTION getContactByNameAction');
    const contactName = __name.toLowerCase();
    if (!contactName.length) return initialContacts;
    return store.contacts = initialContacts.filter(({ name }) => (
      name.toLowerCase().indexOf(contactName) > -1
    ))
  },

  getFilterContactsByGroupAction(contactsIdx: ContactDto['id'][]) {
    console.log('ACTION getFilterContactsByGroupAction');
    store.contacts = initialContacts.filter(({ id }) => (
      contactsIdx.includes(id)
    ))
  },

  resetFilterContactsByGroupAction() {
    console.log('ACTION resetFilterContactsByGroupAction');
    store.contacts = initialContacts;
  },

  getContactByIdAction(__id: ContactDto['id']) {
    console.log('ACTION getContactByIdAction');
    store.contact = initialContacts.filter(g => g.id === __id)[0];
  },

  getGroupByIdAction(__id: GroupContactsDto['id']) {
    console.log('ACTION getGroupByIdAction');
    store.group = store.groups.filter(g => g.id === __id)[0]
  },


})