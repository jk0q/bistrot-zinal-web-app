import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from 'vitest';

function AppWithProviders() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

describe('App', () => {
  it('renders without crashing', () => {
    render(<AppWithProviders />);
    expect(screen.getByRole('heading', { name: /Bistrot de Zinal/i })).toBeInTheDocument();
  });
}); 