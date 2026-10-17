import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './automatic.css'
import App from './App.tsx'

history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
