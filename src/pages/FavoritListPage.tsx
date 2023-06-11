import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { store } from 'src/store/store';

export const FavoritListPage = observer(() => {
  const favorite = store.favorite;
  const contacts = store.contacts;

  useEffect(() => {
    store.getFilterContactsByGroupAction(favorite)
  }, []);

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})
