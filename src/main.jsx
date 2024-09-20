import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/index.css'
import Post from '@/Post'
import Header from '@/components/header/header'
import TextEditor from '@/components/TextEditor'
import UploadFile from '@/components/FileUpload'
import LinkUpload from '@/components/LinkUpload'

createRoot(document.getElementById('header')).render(
  <StrictMode>
    <Header></Header>
  </StrictMode>,
)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Post />}>
        <Route index element={<TextEditor />} />
        <Route path='/image' element={<UploadFile />} />
        <Route path='/link' element={<LinkUpload />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
