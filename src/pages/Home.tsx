import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const mountainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mountainRef.current && contentRef.current) {
        const scrolled = window.scrollY;
        mountainRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        contentRef.current.style.opacity = Math.min(1, 1 - scrolled / 700).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="mountain-animation" ref={mountainRef}>
          <div className="mountain"></div>
          <div className="mountain mountain-2"></div>
          <div className="mountain mountain-3"></div>
          <div className="stars"></div>
        </div>
        <div className="hero-content" ref={contentRef}>
          <h1>Bistrot de Zinal</h1>
          <p className="tagline">Une expérience culinaire au cœur des Alpes valaisannes</p>
        </div>
      </div>

      <div className="welcome-section">
        <div className="container">
          <h2>Bienvenue au Bistrot de Zinal</h2>
          <p>
            Niché au cœur des majestueuses Alpes valaisannes, le Bistrot de Zinal vous invite à 
            découvrir une cuisine authentique et raffinée dans un cadre chaleureux et convivial.
          </p>
          
          <div className="features">
            <div className="feature-card" data-aos="fade-up">
              <h3>Notre Restaurant</h3>
              <p>Savourez nos spécialités valaisannes et notre cuisine traditionnelle revisitée.</p>
              <Link to="/menu" className="cta-button">Découvrir le Menu</Link>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Service Takeaway</h3>
              <p>Emportez nos délicieux plats et profitez-en où vous le souhaitez.</p>
              <Link to="/takeaway" className="cta-button">Commander</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="experience-section">
        <div className="container">
          <div className="experience-content">
            <h2>Une Expérience Unique</h2>
            <ul>
              <li>Vue panoramique sur les Alpes</li>
              <li>Produits locaux et de saison</li>
              <li>Ambiance chaleureuse et authentique</li>
              <li>Service attentionné et professionnel</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Réservez Votre Table</h2>
          <p>Pour une expérience gastronomique inoubliable dans un cadre exceptionnel</p>
          <a href="tel:+41279661234" className="cta-button">Appeler Maintenant</a>
        </div>
      </div>
    </div>
  );
};

export default Home; 