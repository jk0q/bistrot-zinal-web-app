import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 data-testid="welcome-title" className="welcome-title">
          Bienvenue au Bistrot de Zinal
        </h1>

        <img
          src="https://placehold.co/800x400?text=Bistrot+de+Zinal"
          alt="Façade du Bistrot de Zinal"
          className="hero-image"
        />

        <p className="description">
          Découvrez notre cuisine authentique et chaleureuse au cœur des Alpes valaisannes.
        </p>

        <div className="section">
          <h2 data-testid="hours-title" className="section-title">
            Nos horaires
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="list-item">Petit déjeuner: 7h00 - 10h30</li>
            <li className="list-item">Déjeuner: 11h30 - 14h30</li>
            <li className="list-item">Dîner: 18h30 - 22h00</li>
          </ul>
        </div>

        <div className="section">
          <h2 data-testid="specialties-title" className="section-title">
            Nos spécialités
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="list-item">Fondue Moitié-Moitié</li>
            <li className="list-item">Assiette Valaisanne</li>
            <li className="list-item">Rösti maison</li>
          </ul>
        </div>

        <div className="buttons-container">
          <Link to="/menu" data-testid="menu-link" style={{ textDecoration: 'none' }}>
            <button className="primary-button">
              Voir notre menu complet
            </button>
          </Link>
          <Link to="/contact" data-testid="contact-link" style={{ textDecoration: 'none' }}>
            <button className="secondary-button">
              Nous contacter
            </button>
          </Link>
        </div>

        <p className="footer-text">
          Ouvert tous les jours de 9h à 23h
          <br />
          Route de Zinal 42, 3961 Zinal
        </p>
      </div>
    </div>
  )
}