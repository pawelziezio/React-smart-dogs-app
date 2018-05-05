import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router'
import {Footer} from '../Footer'
import  logo from '../../public/img/logo-w-miasto.png'

import {
  Navbar,
  Nav,
  NavItem,
  Grid,
  Row,
  Col
} from 'react-bootstrap'

import './App.css';

export default (props) => (
  <Grid fluid>
    <Navbar collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img className="nav-logo" src={logo} role="presentation"/>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>

          <LinkContainer to="/events">
            <NavItem eventKey={1} href="#">WYDARZENIA</NavItem>
          </LinkContainer>

          <LinkContainer to="/places">
            <NavItem eventKey={2} href="#"><span className="menu-item">LOKALIZACJE</span></NavItem>
          </LinkContainer>

          <LinkContainer to="/favorites">
            <NavItem eventKey={3} href="#">ULUBIONE</NavItem>
          </LinkContainer>



        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Row>
      <Col md={12}>
        {props.children}
      </Col>
    </Row>

    <Row>
      <br/>
      <br/>
      <br/>
      <br/>
        <Footer />
    </Row>

  </Grid>
)