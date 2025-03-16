<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Takeaway from './pages/Takeaway';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/takeaway" element={<Takeaway />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 
=======
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell, MantineProvider } from '@mantine/core'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ContactPage from './pages/ContactPage'
import NotificationSystem from './components/NotificationSystem'
import { useNotification } from './hooks/useNotification'

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
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <MainHeader />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AppShell.Main>

        <AppShell.Footer>
          <MainFooter />
        </AppShell.Footer>
        
        {/* Système de notification */}
        <NotificationSystem 
          notifications={notifications}
          onClose={removeNotification}
        />
      </AppShell>
    </MantineProvider>
  )
}

// Déclaration pour TypeScript
declare global {
  interface Window {
    showNotification?: {
      success: (message: string, duration?: number) => number;
      error: (message: string, duration?: number) => number;
      info: (message: string, duration?: number) => number;
      warning: (message: string, duration?: number) => number;
    };
  }
}
>>>>>>> 617ef222fd69f91f0626cc1231c4429e54caf7bf
