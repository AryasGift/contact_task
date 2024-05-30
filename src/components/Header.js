import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
            <Link to={"/"} style={{textDecoration:'none'}}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://i.postimg.cc/wjm3ddZ6/call-answer-icon-removebg-preview.png"
              width="30"
              height="30"
              className=" d-inline-block align-top ms-4"
            />{' '}
            Contact Saver
          </Navbar.Brand>
          </Link>
      </Navbar>
    </div>
  )
}

export default Header
