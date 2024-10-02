import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Sokoban from './Sokoban.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sokoban />
  </StrictMode>
)
