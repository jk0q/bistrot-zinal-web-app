import React, { useState } from 'react';
import '../styles/Takeaway.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Wraps Party (2 pers.)",
    description: "Assortiment de wraps frais avec tortillas maison",
    price: 45,
    category: "Formules à partager"
  },
  {
    id: 2,
    name: "Wraps Party (4 pers.)",
    description: "Assortiment de wraps frais avec tortillas maison",
    price: 69,
    category: "Formules à partager"
  },
  {
    id: 3,
    name: "Lasagnes de la Mama (viande)",
    description: "Recette traditionnelle italienne au bœuf",
    price: 19,
    category: "Plats cuisinés"
  },
  {
    id: 4,
    name: "Lasagnes de la Mama (végé)",
    description: "Version végétarienne aux légumes de saison",
    price: 19,
    category: "Végan/Végé"
  },
  {
    id: 5,
    name: "Curry same same (végétarien)",
    description: "Curry de légumes à la thaïlandaise, servi avec du riz",
    price: 19,
    category: "Végan/Végé"
  },
  {
    id: 6,
    name: "Curry same same (poulet)",
    description: "Curry au poulet à la thaïlandaise, servi avec du riz",
    price: 19,
    category: "Plats cuisinés"
  },
  {
    id: 7,
    name: "Soupe du jardin",
    description: "Soupe de légumes de saison, servie avec du pain local",
    price: 12,
    category: "Végan/Végé"
  },
  {
    id: 8,
    name: "Polenta crémeuse au parmesan",
    description: "Polenta onctueuse au parmesan de la région",
    price: 16,
    category: "Spécialités valaisannes"
  },
  {
    id: 9,
    name: "Polenta grillée aux champignons",
    description: "Polenta grillée servie avec des champignons de saison",
    price: 18,
    category: "Spécialités valaisannes"
  },
  {
    id: 10,
    name: "Polenta en bâtonnets frits",
    description: "Bâtonnets de polenta croustillants",
    price: 12,
    category: "Spécialités valaisannes"
  }
];

interface CartItem extends MenuItem {
  quantity: number;
}

const Takeaway: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter(item => item.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: number): number => {
    const item = cart.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="takeaway-container">
      <h1>Menu à Emporter</h1>
      
      <div className="takeaway-content">
        <div className="menu-section">
          {categories.map(category => (
            <div key={category} className="category-section">
              <h2>{category}</h2>
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p className="description">{item.description}</p>
                      <p className="price">CHF {item.price.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        disabled={getItemQuantity(item.id) === 0}
                      >
                        -
                      </button>
                      <span>{getItemQuantity(item.id)}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="cart-section">
          <h2>Votre Commande</h2>
          {cart.length === 0 ? (
            <p>Aucun plat sélectionné</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.quantity} x {item.name} - CHF {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <p>Total: CHF {calculateTotal().toFixed(2)}</p>
              </div>
              <button 
                className="checkout-button"
                disabled={cart.length === 0}
                onClick={() => alert('Le système de commande sera bientôt disponible!')}
              >
                Valider la commande
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Takeaway; 