import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Bistrot de Zinal</h1>
      <p>Application en cours de déploiement sur GitHub Pages.</p>
      <p>Si vous voyez cette page, le déploiement fonctionne correctement !</p>
      <div>
        <button style={{ margin: '5px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Accueil</button>
        <button style={{ margin: '5px', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Menu</button>
        <button style={{ margin: '5px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Contact</button>
      </div>
    </div>
  );
}
