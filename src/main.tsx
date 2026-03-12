import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { sprig } from '@sprig-technologies/sprig-browser';

export const Sprig = sprig.configure({
  environmentId: import.meta.env.VITE_SPRIG_ID || 'your-default-dev-id',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
