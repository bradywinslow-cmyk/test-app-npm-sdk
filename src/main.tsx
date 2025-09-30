import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { sprig } from '@sprig-technologies/sprig-browser';

export const Sprig = sprig.configure({
  environmentId: 'LLL0hxW9pJRs',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
