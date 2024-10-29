import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TextEditor from '@/components/TextEditor'
import UploadFile from '@/components/FileUpload'
import LinkUpload from '@/components/LinkUpload'
import BoardsPage from '@/pages/BoardsPage'
import PostPage from '@/pages/PostPage'
import BoardDetailPage from '@/pages/BoardDetailPage'
import Layout from '@/components/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BoardsPage />,
      },
      {
        path: 'post',
        element: <PostPage />,
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
      {
        path: 'detail',
        element: <BoardDetailPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
