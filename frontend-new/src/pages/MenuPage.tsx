import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecial?: boolean;
  tags: string[];
  allergens: string[];
  prepTime: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Fondue Moitié-Moitié',
    description: 'Mélange traditionnel de Gruyère AOP et Vacherin Fribourgeois AOP',
    price: 25,
    image: '/images/fondue.jpg',
    category: 'Spécialités',
    isSpecial: true,
    tags: ['Traditionnel', 'Fromage', 'Chaud'],
    allergens: ['Lactose'],
    prepTime: '20 min'
  },
  // Ajoutez d'autres plats ici
];

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const allTags = [...new Set(menuItems.flatMap(item => item.tags))];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => item.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  const addToCart = (itemId: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    // Créer et afficher la notification
    const notification = document.createElement('div');
    notification.className = 'menu-notification success';
    notification.textContent = 'Article ajouté au panier';
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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Notre Menu</h1>
        <p className="menu-description">
          Découvrez notre sélection de plats traditionnels suisses, préparés avec des ingrédients locaux de qualité.
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
          {selectedTags.length > 0 && (
            <span className="filter-count">{selectedTags.length}</span>
          )}
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
              <img src={item.image} alt={item.name} />
              {item.isSpecial && <span className="special-badge">Spécialité</span>}
              <div className="prep-time">
                <i className="far fa-clock"></i>
                {item.prepTime}
              </div>
            </div>
            <div className="menu-item-content">
              <h3>{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              
              <div className="menu-item-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {item.allergens.length > 0 && (
                <div className="allergens">
                  <i className="fas fa-exclamation-circle"></i>
                  Allergènes: {item.allergens.join(', ')}
                </div>
              )}

              <div className="menu-item-footer">
                <span className="menu-item-price">{item.price.toFixed(2)} CHF</span>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(item.id)}
                >
                  <i className="fas fa-plus"></i>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="cart-summary">
          <div className="cart-info">
            <i className="fas fa-shopping-cart"></i>
            {totalItems} article{totalItems > 1 ? 's' : ''} dans le panier
          </div>
          <button
            className="checkout-button"
            onClick={() => navigate('/checkout')}
          >
            <i className="fas fa-arrow-right"></i>
            Commander
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;