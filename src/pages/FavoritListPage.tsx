import React, {memo, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { getFilterContactsByGroupAction } from 'src/redux/contactsReducer';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';

export const FavoritListPage = memo(() => {
  const contacts: ContactDto[] = useAppSelector(state => state.contacts);
  const favorite: FavoriteContactsDto = useAppSelector(state => state.favorite);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilterContactsByGroupAction(favorite))
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
