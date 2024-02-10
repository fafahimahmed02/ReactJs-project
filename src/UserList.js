import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


const UserList = () => {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [sortBy, setSortBy] = useState('');
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [avatar, setAvatar] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [companyName, setCompanyName] = useState('');

useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

const handleSort = event => {
    setSortBy(event.target.value);
  };
let filteredUsers = users.users?.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
);

if (sortBy) {
    filteredUsers.sort((a, b) => {
    if (sortBy === 'name') {
        return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
    } else if (sortBy === 'company') {
        return a.company.name.localeCompare(b.company.name);
    }
      return 0;
    });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://dummyjson.com/users/', {
      avatar,
      firstName,
      lastName,
      email,
      address,
      companyName
    });
    console.log('Response:', response.data);
    setAvatar('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setAddress('');
    setCompanyName('');
  } catch (error) {
    console.error('Error:', error);
  }
};

return (
  <>
    <div className="user-list">
      <h1>User List</h1>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          className='w-25 me-2'
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
         <Form.Select value={sortBy} onChange={handleSort} aria-label="Default select example" className='me-2 w-25'>
            <option>Sort by...</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </Form.Select>
          <Button variant="primary" onClick={handleShow}>
            Add User +
          </Button>
      </div>
      <div className="user-cards">
        {filteredUsers?.map(user => (
          <Link key={user.id} to={`/user/${user.id}`} target='_blank'>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User Form</Modal.Title>
    </Modal.Header>
    <form onSubmit={handleSubmit}>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input type="file" className="form-control-file" id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
      
      </Modal.Body>
      <Modal.Footer>
        <Button  type="submit" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </form>
    </Modal>
    </>
  );
}

export default UserList;
