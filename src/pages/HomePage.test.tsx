import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { describe, it, expect } from 'vitest';

const HomePageWithRouter = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

describe('HomePage', () => {
  it('renders the welcome title', () => {
    render(<HomePageWithRouter />);
    const title = screen.getByTestId('welcome-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Bienvenue au Bistrot de Zinal/i);
  });

  it('displays the opening hours section', () => {
    render(<HomePageWithRouter />);
    const hoursTitle = screen.getByTestId('hours-title');
    expect(hoursTitle).toBeInTheDocument();
    expect(hoursTitle).toHaveTextContent(/Nos horaires/i);
    expect(screen.getByText(/Petit déjeuner: 7h00 - 10h30/i)).toBeInTheDocument();
  });

  it('displays the specialties section', () => {
    render(<HomePageWithRouter />);
    const specialtiesTitle = screen.getByTestId('specialties-title');
    expect(specialtiesTitle).toBeInTheDocument();
    expect(specialtiesTitle).toHaveTextContent(/Nos spécialités/i);
    expect(screen.getByText(/Fondue Moitié-Moitié/i)).toBeInTheDocument();
  });

  it('has a link to the menu page', () => {
    render(<HomePageWithRouter />);
    const menuLink = screen.getByTestId('menu-link');
    expect(menuLink).toBeInTheDocument();
    expect(menuLink).toHaveAttribute('href', '/menu');
  });

  it('has a link to the contact page', () => {
    render(<HomePageWithRouter />);
    const contactLink = screen.getByTestId('contact-link');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
}); 