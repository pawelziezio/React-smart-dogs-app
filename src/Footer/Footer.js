import React from 'react'
import {Link} from 'react-router'
import {SocialIcon} from 'react-social-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-details">
        <h2 className="footer-group-header">wmiasto</h2>
        <hr />
        <Link to="/events">
          <p>Wydarzenia</p>
        </Link>
        <Link to="/places">
          <p>Lokalizacje</p>
        </Link>
        <Link to="/favorites">
          <p>Ulubione</p>
        </Link>
        <Link to="#">
          <p>FAQ</p>
        </Link>
        <Link to="#">
          <p>O Nas</p>
        </Link>
      </div>
      <div className="footer-icons">
        <h2 className="footer-group-header">social</h2>
        <hr />
        <div className="social-icons">
          <SocialIcon className="social-icon" network="facebook" color="#fff" style={{height: 35, width: 35}}/><br/>
          <SocialIcon className="social-icon" network="twitter" color="#fff" style={{height: 35, width: 35}}/><br/>
          <SocialIcon className="social-icon" network="github" color="#fff" style={{height: 35, width: 35}}/><br/>
        </div>
      </div>
    </div>
  )
}

export default Footer