// Déclaration pour TypeScript
declare global {
  interface Window {
    showNotification?: {
      success(message: string, duration?: number): void;
      error(message: string, duration?: number): void;
      info(message: string, duration?: number): void;
      warning(message: string, duration?: number): void;
    }
  }
}

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import NotificationSystem from './components/NotificationSystem'
import { useNotification } from './hooks/useNotification'
import './App.css'

export default function App() {
  const [welcomeShown, setWelcomeShown] = useState(false);
  const { 
    notifications, 
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning
  } = useNotification();

  // Exposer les fonctions de notification globalement pour faciliter les tests
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      window.showNotification = {
        success: showSuccess,
        error: showError,
        info: showInfo,
        warning: showWarning
      };
    }
    
    // Exemple de notification au démarrage (à supprimer en production)
    if (!welcomeShown) {
      showInfo('Bienvenue au Bistrot de Zinal!');
      setWelcomeShown(true);
    }
    
    return () => {
      if (import.meta.env.DEV && window.showNotification) {
        delete window.showNotification;
      }
    };
  }, [showSuccess, showError, showInfo, showWarning, welcomeShown]);

  return (
    <Router>
      <div className="app">
        <NotificationSystem 
          notifications={notifications}
          onClose={removeNotification}
        />
        <MainHeader />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </main>
        <MainFooter />
      </div>
    </Router>
  )
}
