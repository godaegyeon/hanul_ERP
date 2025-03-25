import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from '../../public/404_not_found.png';

function NotFound() {
  return (
    <>
      <div>404 NotFound : 패이지를 찾을수없습니다.</div>
      <div>
        <img src={Error} alt="error" style={{width:'1000px'}} />
      </div>
    </>
  );
}

export default NotFound;
