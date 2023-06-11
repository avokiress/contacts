import React, {memo, useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { getGroupByIdAction } from 'src/redux/groupReducer';
import { getFilterContactsByGroupAction, resetFilterContactsByGroupAction } from 'src/redux/contactsReducer';

interface IGroupInitialState {
  [key: string]: GroupContactsDto,
}

export const ContactListPage = memo(() => {
  const contacts: ContactDto[] = useAppSelector(state => state.contacts);
  const groupList: GroupContactsDto[] = useAppSelector(state => state.groups)
  const group: IGroupInitialState = useAppSelector(state => state.group)

  const dispatch = useAppDispatch();
  const [contactsState, setContacts] = useState<ContactDto[]>(contacts)
  const [groupIdState, setGroupIdState] = useState<string>('')

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    const { groupId } = fv;
    if (!groupId) return;

    setGroupIdState(groupId);
    dispatch(getGroupByIdAction(groupId));
  }


  useEffect(() => {
    setContacts(contacts)
  }, [contacts])


  useEffect(() => {
    if (!group || !groupIdState) return;

    if (!group[groupIdState]) {
      dispatch(resetFilterContactsByGroupAction())
    } else {
      const { contactIds = [] } = group[groupIdState];
      dispatch(getFilterContactsByGroupAction(contactIds))
    }
  }, [groupIdState])


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
