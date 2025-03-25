import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModifyEmployee({ editEmployee, setIsModalShow }) {
  // console.log(editEmployee);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    _id: editEmployee._id,
    id: editEmployee.employee_id,
    lastName: editEmployee.last_name,
    firstName: editEmployee.first_name,
    hireDate: editEmployee.hire_date,
  });
  // console.log(formData);

  const modalStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 999,
  };

  const handleModalClose = () => {
    setIsModalShow(false);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    updateEmployee();
  };

  const updateEmployee = async () => {
    console.log(formData);
    await axios
      .put(`http://localhost:3000/employees/${formData._id}`, {
        employee_id: formData.id,
        last_name: formData.lastName,
        first_name: formData.firstName,
        hire_date: formData.hireDate,
      })
      .then((response) => {
        if (response.data.matchedCount === 1) {
          alert('업데이트에 성공했습니다');
          location.href;
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal show" style={modalStyle}>
      <Modal.Dialog fullscreen={true}>
        <Modal.Header closeButton onClick={handleModalClose}>
          <Modal.Title>사원정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="EmpId"
                    aria-autocomplete="off"
                  >
                    <Form.Label>사번</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="사번을 입력하세요"
                      onChange={handleChange}
                      name="id"
                      defaultValue={formData.id}
                      disabled
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
                      defaultValue={formData.lastName}
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
                      defaultValue={formData.firstName}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="EmpHireDate"
                  >
                    <Form.Label>입사일</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="입사일을 입력하세요"
                      onChange={handleChange}
                      name="hireDate"
                      defaultValue={formData.hireDate}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>닫기</Button>
          <Button variant="primary">수정</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModifyEmployee;
