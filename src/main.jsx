import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Post from '@/components/Post'
import TextEditor from '@/components/TextEditor'
import UploadFile from '@/components/FileUpload'
import LinkUpload from '@/components/LinkUpload'
import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path: '/post',
    element: <Home />,
    children: [
      {
        index: true,
        element: <TextEditor />,
      },
      {
        path: 'image',
        element: <UploadFile />,
      },
      {
        path: 'link',
        element: <LinkUpload />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>,
)
