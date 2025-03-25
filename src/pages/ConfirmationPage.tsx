import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

interface LocationState {
  orderNumber: string;
  total: number;
}

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state?.orderNumber) {
    return (
      <div className="confirmation-container error">
        <h1>Erreur</h1>
        <p>Aucune commande n'a été trouvée.</p>
        <button onClick={() => navigate('/')} className="return-home">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1>Merci pour votre commande !</h1>
        
        <div className="order-details">
          <p className="order-number">
            Numéro de commande : <span>{state.orderNumber}</span>
          </p>
          <p className="order-total">
            Total : <span>{state.total.toFixed(2)} CHF</span>
          </p>
        </div>

        <div className="confirmation-message">
          <p>
            Votre commande a été enregistrée avec succès. Vous recevrez bientôt un email
            de confirmation avec les détails de votre commande.
          </p>
          <p>
            Notre équipe prépare votre commande avec soin et vous la livrera à l'heure
            choisie.
          </p>
        </div>

        <div className="contact-info">
          <h2>Besoin d'aide ?</h2>
          <p>
            N'hésitez pas à nous contacter :
          </p>
          <ul>
            <li>
              <i className="fas fa-phone"></i>
              <a href="tel:+41279671575">+41 27 967 15 75</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:contact@bistrotdezinal.ch">contact@bistrotdezinal.ch</a>
            </li>
          </ul>
        </div>

        <button onClick={() => navigate('/')} className="return-home">
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
} 