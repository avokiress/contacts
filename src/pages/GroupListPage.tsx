import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppSelector } from 'src/_redux/hooks';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const GroupListPage = memo(() => {
  const groupList: GroupContactsDto[] = useAppSelector(state => state.groups)

  return (
    <Row xxl={4}>
      {groupList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
