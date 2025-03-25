import React, { useState } from 'react';
import axios from 'axios';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function AddEmployees() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    hireDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    addEmployee();
  };

  const addEmployee = async () => {
    await axios
      .post('/employees', {
        employee_id: formData.id,
        last_name: formData.lastName,
        first_name: formData.firstName,
        hire_date: formData.hireDate,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-3">사원 등록</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 text-start"
                controlId="EmpId"
                aria-autocomplete="off"
              >
                <Form.Label>사번</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="사번을 입력하세요"
                  onChange={handleChange}
                  name="id"
                  required
                />
                <Form.Text>
                  추후 사번은 자동 생성되어 부여될 예정입니다.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="EmpLastName"
                aria-autocomplete="off"
              >
                <Form.Label>성</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="성을 입력하세요"
                  onChange={handleChange}
                  name="lastName"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="EmpFirstName"
                aria-autocomplete="off"
              >
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="이름을 입력하세요"
                  onChange={handleChange}
                  name="firstName"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="EmpHireDate">
                <Form.Label>입사일</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="입사일을 입력하세요"
                  onChange={handleChange}
                  name="hireDate"
                  required
                />
                <Form.Text>
                  날짜를 지정하지 않으면 입력일로 적용됩니다.
                </Form.Text>
              </Form.Group>
              <Button type="submit">등록</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddEmployees;
