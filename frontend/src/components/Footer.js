import React from "react";
import "./Footer.css";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="back_to_top" onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }} >Back To Top</div>
      <div className="paddings footer">
        <div className="footer__1">
          <div>
            <div>
              <a href="mailto:avinashukla0704gmail.com" className="footer-link">
                avinashukla0704@gmail.com
              </a>
            </div>

            <div className="footer__socialbar">
              <FaLinkedin className="linkedin_icon" size={30} />
              <FaInstagram className="instagram_icon" size={30} />
              <FaTwitter className="linkedin_icon" size={30} />
              <FaFacebook className="linkedin_icon" size={30} />
            </div>
          </div>
        </div>
        <div className="footer__2">
          <div className="footer__links">
            <a href="/about" className="footer-link list">
              About Us
            </a>
            <a href="/careers" className="footer-link list">
              Careers
            </a>
            <a href="#" className="footer-link list hide-this">
              Newsroom
            </a>
          </div>
          <div className="footer__links">
            <li>Thought Leadership</li>
            <li>Knowledge Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
