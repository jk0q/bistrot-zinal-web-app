import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell, Container, Title, Text, Stack } from '@mantine/core';
import MainHeader from './components/MainHeader.jsx';
import MainFooter from './components/MainFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Page simple pour tester le routage
const TestPage = ({ title }) => (
  <Container size="lg">
    <Stack gap="xl" align="center">
      <Title order={1}>{title}</Title>
      <Text size="lg">Si vous voyez cette page, le routage fonctionne correctement!</Text>
    </Stack>
  </Container>
);

export default function App() {
  return (
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
          <Route path="/" element={<TestPage title="Page d'accueil (Test)" />} />
          <Route path="/menu" element={<TestPage title="Page Menu (Test)" />} />
          <Route path="/contact" element={<TestPage title="Page Contact (Test)" />} />
        </Routes>
      </AppShell.Main>

      <AppShell.Footer>
        <MainFooter />
      </AppShell.Footer>
    </AppShell>
  );
}
