import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getContactByIdAction } from 'src/redux/contactReducer';

interface IContactInitialState {
  [key: string]: ContactDto,
}

export const ContactPage = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const contact: IContactInitialState = useAppSelector(state => state.contact)

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!contactId) return;
    dispatch(getContactByIdAction(contactId));
  }, [contactId]);

  if (!contactId) return null;
  if (!contact || !contact[contactId]) return null;

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact[contactId]} /> : <Empty />}
      </Col>
    </Row>
  );
};
