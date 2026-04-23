import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { SidePanelPage } from '@/pages/sidepanel'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidePanelPage />
  </StrictMode>,
)
