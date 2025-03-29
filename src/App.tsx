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

import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import BreakfastPage from './pages/BreakfastPage'
import Takeaway from './pages/Takeaway'
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

  // Créer des versions sécurisées des fonctions de notification
  const safeShowSuccess = useCallback((message: string, duration?: number) => {
    try {
      showSuccess(message, duration);
    } catch (error) {
      console.warn('Error showing success notification:', error);
    }
  }, [showSuccess]);

  const safeShowError = useCallback((message: string, duration?: number) => {
    try {
      showError(message, duration);
    } catch (error) {
      console.warn('Error showing error notification:', error);
    }
  }, [showError]);

  const safeShowInfo = useCallback((message: string, duration?: number) => {
    try {
      showInfo(message, duration);
    } catch (error) {
      console.warn('Error showing info notification:', error);
    }
  }, [showInfo]);

  const safeShowWarning = useCallback((message: string, duration?: number) => {
    try {
      showWarning(message, duration);
    } catch (error) {
      console.warn('Error showing warning notification:', error);
    }
  }, [showWarning]);

  // Exposer les fonctions de notification globalement pour faciliter les tests
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      window.showNotification = {
        success: safeShowSuccess,
        error: safeShowError,
        info: safeShowInfo,
        warning: safeShowWarning
      };
    }
    
    // Exemple de notification au démarrage (à supprimer en production)
    if (!welcomeShown) {
      safeShowInfo('Bienvenue au Bistrot de Zinal!');
      setWelcomeShown(true);
    }
    
    return () => {
      if (import.meta.env.DEV && window.showNotification) {
        window.showNotification = undefined;
      }
    };
  }, [safeShowSuccess, safeShowError, safeShowInfo, safeShowWarning, welcomeShown]);

  return (
    <Router basename="">
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
            <Route path="/breakfast" element={<BreakfastPage />} />
            <Route path="/takeaway" element={<Takeaway />} />
          </Routes>
        </main>
        <MainFooter />
      </div>
    </Router>
  )
}
