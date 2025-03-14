import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';

// Wrapper pour fournir le contexte du routeur
const HomePageWithRouter = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

describe('HomePage', () => {
  it('renders the welcome title', () => {
    render(<HomePageWithRouter />);
    expect(screen.getByText(/Bienvenue au Bistrot de Zinal/i)).toBeInTheDocument();
  });

  it('displays the opening hours section', () => {
    render(<HomePageWithRouter />);
    expect(screen.getByText(/Nos horaires/i)).toBeInTheDocument();
    expect(screen.getByText(/Petit déjeuner/i)).toBeInTheDocument();
    expect(screen.getByText(/7h00 - 10h30/i)).toBeInTheDocument();
  });

  it('displays the specialties section', () => {
    render(<HomePageWithRouter />);
    expect(screen.getByText(/Nos spécialités/i)).toBeInTheDocument();
    expect(screen.getByText(/Fondue Moitié-Moitié/i)).toBeInTheDocument();
    expect(screen.getByText(/Assiette Valaisanne/i)).toBeInTheDocument();
  });

  it('has a link to the menu page', () => {
    render(<HomePageWithRouter />);
    const menuLink = screen.getByText(/Voir notre menu complet/i);
    expect(menuLink).toBeInTheDocument();
    expect(menuLink.closest('a')).toHaveAttribute('href', '/menu');
  });

  it('has a link to the contact page', () => {
    render(<HomePageWithRouter />);
    const contactLink = screen.getByText(/Nous contacter/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });
}); 