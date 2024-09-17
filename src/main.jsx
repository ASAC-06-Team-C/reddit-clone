import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@/index.css'
import Post from '@/Post'

const router = createBrowserRouter([
  { path: '/', element: <Post /> },
  { path: '/submit?type=IMAGE', element: <Post /> },
  { path: '/submit?type=LINK', element: <Post /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
