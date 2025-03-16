import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
=======
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@mantine/core/styles.css'
import './styles/global.css'
>>>>>>> 617ef222fd69f91f0626cc1231c4429e54caf7bf
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<<<<<<< HEAD
    <Router>
      <App />
    </Router>
  </React.StrictMode>
) 
=======
    <MantineProvider>
      <BrowserRouter basename="/bistrot-zinal-web-app">
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)
>>>>>>> 617ef222fd69f91f0626cc1231c4429e54caf7bf
