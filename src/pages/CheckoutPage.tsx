import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  deliveryTime: string;
  paymentMethod: string;
  notes: string;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    deliveryTime: '',
    paymentMethod: 'card',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setItems(cartItems);
      const newTotal = cartItems.reduce((sum: number, item: CartItem) => 
        sum + (item.price * item.quantity), 0
      );
      setTotal(newTotal);
    }
  }, []);

  const validateStep = (step: number): boolean => {
    const errors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.firstName) errors.firstName = 'Le prénom est requis';
      if (!formData.lastName) errors.lastName = 'Le nom est requis';
      if (!formData.email) errors.email = 'L\'email est requis';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Email invalide';
      }
      if (!formData.phone) errors.phone = 'Le téléphone est requis';
    }
    
    if (step === 2) {
      if (!formData.address) errors.address = 'L\'adresse est requise';
      if (!formData.deliveryTime) errors.deliveryTime = 'L\'heure de livraison est requise';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        // Simulation d'une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Réinitialisation du panier
        localStorage.removeItem('cart');
        
        // Redirection vers la page de confirmation
        navigate('/confirmation', { 
          state: { 
            orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
            total 
          }
        });
      } catch (error) {
        console.error('Erreur lors de la commande:', error);
      }
    }
  };

  const getDeliveryTimes = () => {
    const times = [];
    for (let hour = 11; hour <= 21; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  return (
    <div className="checkout-container">
      <div className="checkout-progress">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Informations</span>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Livraison</span>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Paiement</span>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Vos informations</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={formErrors.firstName ? 'error' : ''}
                    />
                    {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={formErrors.lastName ? 'error' : ''}
                    />
                    {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : ''}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h2>Livraison</h2>
                <div className="form-group">
                  <label htmlFor="address">Adresse de livraison</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? 'error' : ''}
                  />
                  {formErrors.address && <span className="error-message">{formErrors.address}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryTime">Heure de livraison souhaitée</label>
                  <select
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className={formErrors.deliveryTime ? 'error' : ''}
                  >
                    <option value="">Sélectionnez une heure</option>
                    {getDeliveryTimes().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {formErrors.deliveryTime && <span className="error-message">{formErrors.deliveryTime}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Instructions spéciales</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Instructions pour la livraison, allergies, etc."
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h2>Paiement</h2>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="card">
                      <i className="fas fa-credit-card"></i>
                      Carte de crédit
                    </label>
                  </div>
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="twint"
                      name="paymentMethod"
                      value="twint"
                      checked={formData.paymentMethod === 'twint'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="twint">
                      <i className="fas fa-mobile-alt"></i>
                      TWINT
                    </label>
                  </div>
                </div>

                <div className="order-summary">
                  <h3>Récapitulatif de la commande</h3>
                  {items.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} CHF</span>
                    </div>
                  ))}
                  <div className="summary-total">
                    <span>Total</span>
                    <span>{total.toFixed(2)} CHF</span>
                  </div>
                </div>
              </div>
            )}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrevStep} className="prev-button">
                  Retour
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" onClick={handleNextStep} className="next-button">
                  Continuer
                </button>
              ) : (
                <button type="submit" className="submit-button">
                  Confirmer la commande
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 