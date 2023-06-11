import {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite'
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { store } from 'src/store/store';

export const ContactListPage = observer(() => {
  const contacts = store.contacts;
  const groupList = store.groups;
  const group = store.group;

  const [contactsState, setContacts] = useState<ContactDto[]>(contacts)
  const [groupIdState, setGroupIdState] = useState<string>('')

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    const { groupId, name: contactName } = fv;

    if (!groupId) {
      store.resetFilterContactsByGroupAction()
    }

    if (groupId) {
      setGroupIdState(groupId);
      store.getContactsGroupByIdAction(groupId);
    }

    if (contactName || contactName === '') {
      store.getContactByNameAction(contactName)
    }
  }


  useEffect(() => {
    setContacts(contacts)
  }, [contacts])


  useEffect(() => {
    if (!group || !groupIdState) return;

    if (!groupIdState) {
      store.resetFilterContactsByGroupAction();
    } else {
      const { contactIds = [] } = group;
      store.getFilterContactsByGroupAction(contactIds)
    }
  }, [groupIdState, group])


  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupList} initialValues={{ }} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contactsState.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
})
