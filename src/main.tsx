import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { sprig } from '@sprig-technologies/sprig-browser';

sprig.configure({
  environmentId: window.location.host === 'localhost:5173' ? 'LLL0hxW9pJRs' : 'KNdk_fZsAYt0'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
