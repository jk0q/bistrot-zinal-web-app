import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Bistrot de Zinal</h1>
        <p className="hero-subtitle">Cuisine de montagne authentique</p>
      </div>

      <div className="main-buttons-container">
        <button 
          className="main-nav-button menu-button"
          onClick={() => navigate('/menu')}
        >
          <i className="fas fa-utensils button-icon"></i>
          <span className="button-text">Menu Restaurant</span>
          <span className="button-description">Découvrez notre carte et nos spécialités</span>
        </button>

        <button 
          className="main-nav-button takeaway-button"
          onClick={() => navigate('/takeaway')}
        >
          <i className="fas fa-shopping-bag button-icon"></i>
          <span className="button-text">Commande à emporter</span>
          <span className="button-description">Commandez et emportez vos plats préférés</span>
        </button>

        <button 
          className="main-nav-button breakfast-button"
          onClick={() => navigate('/breakfast')}
        >
          <i className="fas fa-coffee button-icon"></i>
          <span className="button-text">Petit déjeuner</span>
          <span className="button-description">Démarrez votre journée avec nos petits déjeuners</span>
        </button>
      </div>

      <div className="home-info">
        <div className="info-card">
          <i className="fas fa-clock info-icon"></i>
          <div className="info-content">
            <h3>Horaires d'ouverture</h3>
            <p>Tous les jours: 7h00 - 22h00</p>
          </div>
        </div>

        <div className="info-card">
          <i className="fas fa-map-marker-alt info-icon"></i>
          <div className="info-content">
            <h3>Adresse</h3>
            <p>Place du Village, Zinal, Valais</p>
          </div>
        </div>

        <div className="info-card">
          <i className="fas fa-phone info-icon"></i>
          <div className="info-content">
            <h3>Réservations</h3>
            <p>+41 27 123 45 67</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage