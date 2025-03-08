import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import Todolist from './components/todolist/todolist'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Todolist />
  </StrictMode>,
)