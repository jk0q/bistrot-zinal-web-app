import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Nettoyage automatique après chaque test
afterEach(() => {
  cleanup();
});

// Mock des variables d'environnement
vi.mock('../services/api', () => {
  return {
    API_BASE_URL: 'http://localhost:3000',
    menuService: {
      getAll: vi.fn().mockResolvedValue([]),
      getByCategory: vi.fn().mockResolvedValue([]),
      getById: vi.fn().mockResolvedValue({}),
    },
    reservationService: {
      create: vi.fn().mockResolvedValue({}),
      getById: vi.fn().mockResolvedValue({}),
    },
    orderService: {
      create: vi.fn().mockResolvedValue({}),
      getById: vi.fn().mockResolvedValue({}),
      updateStatus: vi.fn().mockResolvedValue({}),
    },
    contactService: {
      send: vi.fn().mockResolvedValue({ success: true }),
    },
    mockData: {
      menu: [
        {
          id: '1',
          name: 'Test Item',
          description: 'Test Description',
          price: 10.0,
          category: 'breakfast',
        },
      ],
    },
  };
});

// Mock des variables d'environnement
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock pour les variables d'environnement
vi.mock('../env', () => {
  return {
    env: {
      VITE_APP_TITLE: 'Bistrot de Zinal Test',
      VITE_API_URL: 'http://localhost:3000',
      VITE_CONTACT_EMAIL: 'test@example.com',
      VITE_CONTACT_PHONE: '+41 XX XXX XX XX',
      VITE_CONTACT_ADDRESS: 'Test Address',
    },
  };
}); 