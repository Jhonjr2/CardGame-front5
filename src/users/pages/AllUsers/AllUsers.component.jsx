import { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import LoggedUserCard from '../../components/LoggedUserCard/LoggedUserCard.component';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>

      <LoggedUserCard />
    </div>
  )
}

export default AllUsers