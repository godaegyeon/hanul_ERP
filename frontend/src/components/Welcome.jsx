import React from 'react';
import landingImage from '../../public/landing.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-center py-3'>사원관리 시스템</h1>
          <div className='mx-auto'>
            <img src={landingImage} alt="landing" style={{width:'1000px'}} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
