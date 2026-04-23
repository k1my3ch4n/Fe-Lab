import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { PopupPage } from '@/pages/popup'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupPage />
  </StrictMode>,
)
