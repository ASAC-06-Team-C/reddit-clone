import { StrictMode, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createRoot } from 'react-dom/client'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'

function InputTitle() {
  const [input, setInput] = useState('')
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(input.length)
  }, [input])
  return (
    <>
      <Input
        type='text'
        placeholder='title'
        value={input}
        size='lg'
        onChange={(e) => {
          setInput(e.currentTarget.value)
        }}
      ></Input>
      <p className='text-sm relative right-0'>{length}/300</p>
    </>
  )
}

function App() {
  return (
    <>
      <Button variant='destructive'>Text</Button>
      <InputTitle />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Editor
      initialValue=' '
      previewStyle='vertical'
      height='240px'
      initialEditType='wysiwyg'
      useCommandShortcut={false}
    />
  </StrictMode>,
)
