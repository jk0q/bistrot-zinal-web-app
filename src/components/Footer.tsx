import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Bistrot de Zinal</h3>
          <p>Route de Zinal 123</p>
          <p>3961 Zinal, Valais</p>
          <p>Suisse</p>
        </div>
        
        <div className="footer-section">
          <h3>Horaires</h3>
          <p>Lundi - Dimanche</p>
          <p>11:30 - 14:30</p>
          <p>18:30 - 22:00</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Tél: +41 27 123 45 67</p>
          <p>Email: info@bistrotzinal.ch</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bistrot de Zinal. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer; 