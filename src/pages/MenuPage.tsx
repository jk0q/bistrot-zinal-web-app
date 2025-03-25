import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecial?: boolean;
  tags?: string[];
  allergens?: string[];
  prepTime?: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Fondue Moitié-Moitié',
    description: 'Mélange traditionnel de Gruyère AOP et Vacherin Fribourgeois AOP',
    price: 25,
    image: '/images/fondue.jpg',
    category: 'Spécialités',
    isSpecial: true,
    tags: ['traditionnel', 'fromage', 'chaud'],
    allergens: ['lactose'],
    prepTime: '20 min'
  },
  {
    id: '2',
    name: 'Raclette Traditionnelle',
    description: 'Fromage à raclette du Valais AOP servi avec pommes de terre et condiments',
    price: 28,
    image: '/images/raclette.jpg',
    category: 'Spécialités',
    isSpecial: true
  },
  {
    id: '3',
    name: 'Croûte au Fromage',
    description: 'Pain grillé, fromage fondu, jambon et œuf',
    price: 22,
    image: '/images/croute.jpg',
    category: 'Spécialités'
  },
  {
    id: '4',
    name: 'Salade de Chèvre Chaud',
    description: 'Mesclun, toasts de chèvre, miel, noix et lardons',
    price: 18,
    image: '/images/salade-chevre.jpg',
    category: 'Entrées'
  },
  {
    id: '5',
    name: 'Soupe du Jour',
    description: 'Préparée avec des légumes de saison',
    price: 12,
    image: '/images/soupe.jpg',
    category: 'Entrées'
  },
  {
    id: '6',
    name: 'Rösti Montagnard',
    description: 'Rösti, jambon cru, fromage raclette et œuf au plat',
    price: 24,
    image: '/images/rosti.jpg',
    category: 'Plats'
  },
  {
    id: '7',
    name: 'Entrecôte Parisienne',
    description: 'Bœuf grillé, sauce aux morilles, pommes frites maison',
    price: 38,
    image: '/images/entrecote.jpg',
    category: 'Plats'
  },
  {
    id: '8',
    name: 'Tarte aux Myrtilles',
    description: 'Myrtilles sauvages des Alpes, crème fouettée',
    price: 9,
    image: '/images/tarte-myrtilles.jpg',
    category: 'Desserts'
  },
  {
    id: '9',
    name: 'Meringues et Crème Double',
    description: 'Meringues de Gruyère, crème double de la Gruyère',
    price: 10,
    image: '/images/meringues.jpg',
    category: 'Desserts'
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const navigate = useNavigate();

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const allTags = [...new Set(menuItems.flatMap(item => item.tags || []))];

  const filteredItems = menuItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => 
      selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags?.includes(tag))
    );

  const addToCart = (item: MenuItem) => {
    const newCart = {
      ...cart,
      [item.id]: (cart[item.id] || 0) + 1
    };
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Animation de notification
    const notification = document.createElement('div');
    notification.className = 'menu-notification success';
    notification.textContent = `${item.name} ajouté au panier`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }, 100);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const goToCheckout = () => {
    const cartItems = menuItems
      .filter(item => cart[item.id])
      .map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: cart[item.id],
        category: item.category
      }));
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Notre Carte</h1>
        <p className="menu-description">
          Découvrez nos spécialités valaisannes et nos plats traditionnels,
          préparés avec des produits locaux de qualité.
        </p>
      </div>

      <div className="menu-filters">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          className="filters-toggle"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <i className="fas fa-filter"></i>
          Filtres
          <span className="filter-count">
            {(selectedCategory !== 'all' ? 1 : 0) + selectedTags.length}
          </span>
        </button>
      </div>

      <div className={`filters-panel ${isFiltersVisible ? 'visible' : ''}`}>
        <div className="category-filter">
          <h3>Catégories</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tous les plats' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="tags-filter">
          <h3>Tags</h3>
          <div className="tag-buttons">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className={`menu-item ${item.isSpecial ? 'special' : ''}`}>
            <div className="menu-item-image">
              <img src={item.image} alt={item.name} loading="lazy" />
              {item.isSpecial && <span className="special-badge">Spécialité</span>}
              {item.prepTime && (
                <span className="prep-time">
                  <i className="fas fa-clock"></i> {item.prepTime}
                </span>
              )}
            </div>
            <div className="menu-item-content">
              <h3>{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              
              {item.tags && (
                <div className="menu-item-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              
              {item.allergens && (
                <div className="allergens">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>Allergènes: {item.allergens.join(', ')}</span>
                </div>
              )}

              <div className="menu-item-footer">
                <span className="menu-item-price">{item.price.toFixed(2)} CHF</span>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(item)}
                >
                  <i className="fas fa-plus"></i>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getTotalItems() > 0 && (
        <div className="cart-summary">
          <div className="cart-info">
            <i className="fas fa-shopping-cart"></i>
            <span>{getTotalItems()} article(s)</span>
          </div>
          <button className="checkout-button" onClick={goToCheckout}>
            <i className="fas fa-arrow-right"></i>
            Commander
          </button>
        </div>
      )}
    </div>
  );
}