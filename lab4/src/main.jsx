import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css' // <--- ADD THIS LINE TO LINK THE STYLES
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)