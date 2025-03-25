import React from 'react'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Bistrot de Zinal</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#228be6', padding: '0.5rem' }}>
          Accueil
        </Link>
        <Link to="/menu" style={{ textDecoration: 'none', color: '#228be6', padding: '0.5rem' }}>
          Menu
        </Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: '#228be6', padding: '0.5rem' }}>
          Contact
        </Link>
      </nav>
    </div>
  )
}