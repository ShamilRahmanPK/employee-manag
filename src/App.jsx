import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

const API_URL = 'https://employe-server.onrender.com/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', state: 'Inactive' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get(API_URL);
    setContacts(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      await axios.post(API_URL, formData);
    } else {
      await axios.put(`${API_URL}/${formData.id}`, formData);
      setShowModal(false);
    }
    fetchContacts();
    setFormData({ id: '', name: '', email: '', state: 'Inactive' });
  };

  const handleEdit = (contact) => {
    setFormData(contact); 
    setShowModal(true); 
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({ id: '', name: '', email: '', state: 'Inactive' });
  };

  return (
    <>
      <div style={{ width: '100vw' }} className="d-flex justify-content-center">
        
        <Form onSubmit={handleSubmit}>
        <h1>Employee Details</h1>
          <div className="d-flex">
            <Form.Group className="mb-3 me-2" controlId="formGroupId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="d-flex">
            <Form.Group className="mb-3 me-2" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group style={{ width: '200px' }} as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option>Inactive</option>
                <option>Active</option>
              </Form.Select>
            </Form.Group>
          </div>
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div style={{ width: '100vw' }} className="d-flex justify-content-center mt-5">
        <Table striped bordered hover className="w-75">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>State</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.state}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(contact)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(contact.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      


      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="modalFormGroupId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalFormGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalFormGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalFormGridState">
              <Form.Label>State</Form.Label>
              <Form.Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option>Inactive</option>
                <option>Active</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
