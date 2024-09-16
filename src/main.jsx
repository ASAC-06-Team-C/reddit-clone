import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import Comment from '@/Comment'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Comment />
  </StrictMode>,
)
