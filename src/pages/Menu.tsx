import React from 'react';
import '../styles/Menu.css';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    title: "Entrées",
    items: [
      {
        name: "Soupe du jour",
        description: "Préparée avec les légumes de saison",
        price: 12
      },
      {
        name: "Salade de chèvre chaud",
        description: "Mesclun, toasts de chèvre, miel local, noix",
        price: 16
      },
      {
        name: "Tartare de bœuf",
        description: "Bœuf local assaisonné à votre goût",
        price: 19
      }
    ]
  },
  {
    title: "Plats Principaux",
    items: [
      {
        name: "Entrecôte Parisienne",
        description: "Sauce au choix, légumes de saison, frites maison",
        price: 38
      },
      {
        name: "Filets de perche meunière",
        description: "Sauce tartare, pommes vapeur, légumes",
        price: 32
      },
      {
        name: "Rösti montagnard",
        description: "Lard, fromage raclette, œuf au plat",
        price: 24
      }
    ]
  },
  {
    title: "Spécialités Valaisannes",
    items: [
      {
        name: "Fondue moitié-moitié",
        description: "Gruyère et Vacherin, pain",
        price: 25
      },
      {
        name: "Raclette (par portion)",
        description: "Fromage de Zinal, pommes de terre, condiments",
        price: 8
      },
      {
        name: "Croûte au fromage",
        description: "Pain de seigle, fromage local, jambon",
        price: 22
      }
    ]
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Tarte aux myrtilles",
        description: "Myrtilles sauvages, glace vanille",
        price: 12
      },
      {
        name: "Meringues et crème double",
        description: "Meringues de Gruyère, crème de la Gruyère",
        price: 10
      },
      {
        name: "Fondant au chocolat",
        description: "Cœur coulant, glace artisanale",
        price: 14
      }
    ]
  }
];

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <h1>Notre Carte</h1>
      
      <div className="menu-content">
        {menuData.map((section, index) => (
          <section key={index} className="menu-section">
            <h2>{section.title}</h2>
            <div className="menu-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="menu-item">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="price">CHF {item.price}</span>
                  </div>
                  <p className="description">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="menu-footer">
        <p>Tous nos prix sont en CHF, TVA incluse</p>
        <p>Pour toute allergie ou intolérance, merci de nous en informer</p>
      </div>
    </div>
  );
};

export default Menu; 