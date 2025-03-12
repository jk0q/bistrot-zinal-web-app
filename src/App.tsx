import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ContactPage from './pages/ContactPage'

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
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppShell.Main>

      <AppShell.Footer>
        <MainFooter />
      </AppShell.Footer>
    </AppShell>
  )
}