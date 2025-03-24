import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  isOpen
}) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingItemId, setAnimatingItemId] = useState<number | null>(null);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (itemId: number, delta: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity >= 0) {
      setAnimatingItemId(itemId);
      setIsAnimating(true);
      setTimeout(() => {
        onUpdateQuantity(itemId, newQuantity);
        setIsAnimating(false);
        setAnimatingItemId(null);
      }, 200);
    }
    
    if (newQuantity === 0) {
      showNotification("Article retiré du panier", "warning");
    } else {
      showNotification("Quantité mise à jour", "success");
    }
  };

  const showNotification = (message: string, type: 'success' | 'warning') => {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      showNotification("Votre panier est vide", "warning");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Votre Panier</h2>
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <i className="fas fa-shopping-basket"></i>
          <p>Votre panier est vide</p>
          <button onClick={() => navigate('/menu')}>
            Voir le Menu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div 
                key={item.id} 
                className={`cart-item ${animatingItemId === item.id ? 'animating' : ''}`}
              >
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-price">
                    {(item.price * item.quantity).toFixed(2)} CHF
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="quantity-button"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="quantity-button"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{totalAmount.toFixed(2)} CHF</span>
              </div>
              <div className="summary-row">
                <span>Articles</span>
                <span>{totalItems}</span>
              </div>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              <i className="fas fa-shopping-cart"></i>
              Commander ({totalAmount.toFixed(2)} CHF)
            </button>
          </div>
        </>
      )}

      <div className="cart-toggle" onClick={onClose}>
        <i className={`fas fa-shopping-cart ${isAnimating ? 'bounce' : ''}`}></i>
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </div>
    </div>
  );
};

export default Cart; 