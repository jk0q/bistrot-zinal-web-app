import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';

interface LocationState {
  orderNumber: string;
  total: number;
  estimatedTime?: string;
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state?.orderNumber) {
    return (
      <div className="confirmation-error">
        <div className="error-content">
          <i className="fas fa-exclamation-circle"></i>
          <h1>Erreur</h1>
          <p>Aucune commande n'a été trouvée.</p>
          <button onClick={() => navigate('/')} className="return-home">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <div className="success-animation">
          <i className="fas fa-check-circle"></i>
        </div>

        <h1>Merci pour votre commande !</h1>
        
        <div className="order-details">
          <div className="detail-item">
            <span className="label">Numéro de commande :</span>
            <span className="value">{state.orderNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Total :</span>
            <span className="value">{state.total.toFixed(2)} CHF</span>
          </div>
          {state.estimatedTime && (
            <div className="detail-item">
              <span className="label">Heure de livraison estimée :</span>
              <span className="value">{state.estimatedTime}</span>
            </div>
          )}
        </div>

        <div className="confirmation-steps">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-receipt"></i>
            </div>
            <h3>Commande reçue</h3>
            <p>Nous avons bien reçu votre commande</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-kitchen-set"></i>
            </div>
            <h3>Préparation</h3>
            <p>Notre équipe prépare votre commande</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Livraison</h3>
            <p>Votre commande sera livrée à l'heure choisie</p>
          </div>
        </div>

        <div className="email-notification">
          <i className="fas fa-envelope"></i>
          <p>
            Un email de confirmation a été envoyé à votre adresse email.
            Vous y trouverez tous les détails de votre commande.
          </p>
        </div>

        <div className="contact-section">
          <h2>Besoin d'aide ?</h2>
          <p>Notre équipe est là pour vous aider</p>
          <div className="contact-methods">
            <a href="tel:+41279671575" className="contact-method">
              <i className="fas fa-phone"></i>
              <span>+41 27 967 15 75</span>
            </a>
            <a href="mailto:contact@bistrotdezinal.ch" className="contact-method">
              <i className="fas fa-envelope"></i>
              <span>contact@bistrotdezinal.ch</span>
            </a>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="return-home">
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
} 