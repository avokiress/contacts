import {useEffect} from 'react';
import { observer } from 'mobx-react-lite'
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { store } from 'src/store/store';

export const ContactPage = observer(() => {
  const {contactId} = useParams<{ contactId: string }>();
  const contact = store.contact;

  useEffect(() => {
    if (!contactId) return;
    store.getContactByIdAction(contactId);
  }, [contactId]);

  if (!contactId) return null;
  if (!contact || !contact) return null;

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
});
