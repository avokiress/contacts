import React, {memo, useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getGroupByIdAction } from 'src/redux/groupReducer';

interface IGroupInitialState {
  [key: string]: GroupContactsDto,
}

export const GroupPage = memo<CommonPageProps>(({ contactsState, groupContactsState, favoriteContactsState }) => {
  const {groupId} = useParams<{ groupId: string }>();
  // const [contacts, setContacts] = useState<ContactDto[]>([]);
  // const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();
  const dispatch = useAppDispatch()
  const group: IGroupInitialState = useAppSelector(state => state.group)

  useEffect(() => {
    // const findGroup = groupContactsState[0].find(({id}) => id === groupId);
    // setGroupContacts(findGroup);
    // setContacts(() => {
    //   if (findGroup) {
    //     return contactsState[0].filter(({id}) => findGroup.contactIds.includes(id))
    //   }
    //   return [];
    // });
    if (!groupId) return;
    dispatch(getGroupByIdAction(groupId))
  }, [groupId]);

  if (!groupId) return null;
  if (!group || !group[groupId]) return null;


  return (
    <Row className="g-4">
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={group[groupId]} />
              </Col>
            </Row>
          </Col>
          {/* <Col>
            <Row xxl={4} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col> */}
        </>
      ) : <Empty />}
    </Row>
  );
});
