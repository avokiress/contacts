import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { store } from 'src/store/store';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const { group, contacts } = store
  // const contacts = store.contacts;


  useEffect(() => {
    if (!groupId) return;

    store.getGroupByIdAction(groupId)
  }, [groupId]);

  useEffect(() => {
    if (!group) return;

    const { contactIds = [] } = group;
    if (contactIds.length) {
      store.getFilterContactsByGroupAction(contactIds)
    }
  }, [group]);


  if (!groupId) return null;


  return (
    <Row className="g-4">
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={group} />
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
