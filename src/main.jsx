import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Post from '@/components/Post'
import TextEditor from '@/components/TextEditor'
import UploadFile from '@/components/FileUpload'
import LinkUpload from '@/components/LinkUpload'
import AppLayout from '@/components/AppLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Post />
      </AppLayout>
    ),
    children: [
      {
        path: '',
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
  </StrictMode>,
)
