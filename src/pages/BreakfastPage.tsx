import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BreakfastPage.css';

interface BreakfastItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface BreakfastOrder {
  id: number;
  quantity: number;
}

const breakfastItems: BreakfastItem[] = [
  {
    id: 1,
    name: "Petit déjeuner Continental",
    description: "Croissant, pain, beurre, confiture, jus d'orange et café ou thé",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Petit déjeuner Suisse",
    description: "Muesli, yaourt, fruits frais, pain, fromage, jus et café ou thé",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1569145755430-9675ace5ca3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Petit déjeuner Anglais",
    description: "Œufs, bacon, tomates, saucisses, toast, jus et café ou thé",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1543826173-70651703c5a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    name: "Tartines Avocado",
    description: "Pain complet, avocats, œufs pochés, tomates, jus et café ou thé",
    price: 15.90,
    image: "https://images.unsplash.com/photo-1603046891744-1f65079a5f2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const BreakfastPage: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<BreakfastOrder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [orderTime, setOrderTime] = useState<string>("08:00");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const addToOrder = (itemId: number) => {
    const existingItem = order.find(item => item.id === itemId);
    
    if (existingItem) {
      setOrder(order.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setOrder([...order, { id: itemId, quantity: 1 }]);
    }
    
    // Afficher une notification
    const item = breakfastItems.find(item => item.id === itemId);
    showNotification(`${item?.name} ajouté au panier`);
  };

  const removeFromOrder = (itemId: number) => {
    const existingItem = order.find(item => item.id === itemId);
    
    if (existingItem && existingItem.quantity > 1) {
      setOrder(order.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setOrder(order.filter(item => item.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return order.reduce((total, orderItem) => {
      const item = breakfastItems.find(item => item.id === orderItem.id);
      return total + (item ? item.price * orderItem.quantity : 0);
    }, 0);
  };

  const getItemQuantity = (itemId: number) => {
    const item = order.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'breakfast-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const handleCheckout = () => {
    if (order.length === 0) {
      showNotification("Veuillez sélectionner au moins un article");
      return;
    }
    setShowModal(true);
  };

  const confirmOrder = () => {
    if (!name || !phoneNumber) {
      showNotification("Veuillez remplir tous les champs");
      return;
    }
    
    // Ici on enverrait normalement les données au backend
    // Pour l'instant, on simule une réponse réussie
    const orderNumber = Math.floor(Math.random() * 10000);
    
    navigate('/order-confirmation', { 
      state: { 
        orderNumber,
        totalAmount: getTotalPrice(),
        estimatedDeliveryTime: orderTime
      } 
    });
  };

  return (
    <div className="breakfast-page">
      <div className="breakfast-header">
        <h1>Petit Déjeuner</h1>
        <p>Commandez votre petit déjeuner à l'avance et passez le récupérer à l'heure souhaitée</p>
      </div>

      <div className="breakfast-items">
        {breakfastItems.map(item => (
          <div key={item.id} className="breakfast-item">
            <img src={item.image} alt={item.name} className="breakfast-image" />
            <div className="breakfast-content">
              <h3>{item.name}</h3>
              <p className="breakfast-description">{item.description}</p>
              <p className="breakfast-price">{item.price.toFixed(2)} CHF</p>
              
              <div className="breakfast-controls">
                {getItemQuantity(item.id) > 0 ? (
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn minus" 
                      onClick={() => removeFromOrder(item.id)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity">{getItemQuantity(item.id)}</span>
                    <button 
                      className="quantity-btn plus" 
                      onClick={() => addToOrder(item.id)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                ) : (
                  <button 
                    className="add-button" 
                    onClick={() => addToOrder(item.id)}
                  >
                    <i className="fas fa-plus"></i> Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {order.length > 0 && (
        <div className="breakfast-order-summary">
          <h3>Votre commande</h3>
          <div className="order-items">
            {order.map(orderItem => {
              const item = breakfastItems.find(i => i.id === orderItem.id);
              return item ? (
                <div key={item.id} className="order-item">
                  <span className="order-item-name">
                    {orderItem.quantity} x {item.name}
                  </span>
                  <span className="order-item-price">
                    {(item.price * orderItem.quantity).toFixed(2)} CHF
                  </span>
                </div>
              ) : null;
            })}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>{getTotalPrice().toFixed(2)} CHF</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Finaliser la commande
          </button>
        </div>
      )}

      {showModal && (
        <div className="breakfast-modal-overlay">
          <div className="breakfast-modal">
            <h3>Finaliser votre commande</h3>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Nom</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="form-group">
                <label>Téléphone</label>
                <input 
                  type="tel" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                />
              </div>
              
              <div className="form-group">
                <label>Heure de récupération</label>
                <input 
                  type="time" 
                  value={orderTime} 
                  onChange={(e) => setOrderTime(e.target.value)}
                  min="07:00" 
                  max="10:30"
                />
                <small>Horaires disponibles: 7h00 - 10h30</small>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button 
                className="confirm-button" 
                onClick={confirmOrder}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakfastPage; 