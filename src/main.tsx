import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@mantine/core/styles.css'
import './styles/global.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter basename="/bistrot-zinal-web-app">
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)