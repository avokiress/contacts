import React, { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/_redux/hooks';
import { getGroupByIdAction } from 'src/_redux/groupReducer';
import { getFilterContactsByGroupAction } from 'src/_redux/contactsReducer';

interface IGroupInitialState {
  [key: string]: GroupContactsDto,
}

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const dispatch = useAppDispatch()
  const group: IGroupInitialState = useAppSelector(state => state.group)
  const contacts: ContactDto[] = useAppSelector(state => state.contacts);

  useEffect(() => {
    if (!groupId) return;
    dispatch(getGroupByIdAction(groupId))
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;
    if (group[groupId]) {
      const { contactIds = [] } = group[groupId];
      if (contactIds.length) {
        dispatch(getFilterContactsByGroupAction(contactIds))
      }
    }
  }, [group]);


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
          {contacts.length &&
            <Col>
              <Row xxl={4} className="g-4">
                {contacts.map((contact) => (
                  <Col key={contact.id}>
                    <ContactCard contact={contact} withLink />
                  </Col>
                ))}
              </Row>
            </Col>
          }
        </>
      ) : <Empty />}
    </Row>
  );
});
