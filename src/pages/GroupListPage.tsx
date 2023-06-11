import { observer } from 'mobx-react-lite'
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { store } from 'src/store/store';

export const GroupListPage = observer(() => {
  const groupList = store.groups;

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
