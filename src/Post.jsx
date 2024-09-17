import { StrictMode, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createRoot } from 'react-dom/client'
import { Editor } from '@toast-ui/react-editor'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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

function Post() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '240px', marginRight: '16px', flexShrink: 0 }}>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Community</AccordionTrigger>
              <AccordionContent>SubReddit1</AccordionContent>
              <AccordionContent>SubReddit2</AccordionContent>
              <AccordionContent>SubReddit3</AccordionContent>
              <AccordionContent>SubReddit4</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Recent</AccordionTrigger>
              <AccordionContent>SubReddit5</AccordionContent>
              <AccordionContent>SubReddit6</AccordionContent>
              <AccordionContent>SubReddit7</AccordionContent>
              <AccordionContent>SubReddit8</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <h1>Create post</h1>
          <div style={{ height: '60px' }}>
            {' '}
            {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
            <br />
          </div>
          <Button variant='destructive'>Text</Button>
          <InputTitle />
          <Editor
            initialValue=' '
            previewStyle='vertical'
            height='240px'
            initialEditType='wysiwyg'
            useCommandShortcut={false}
          />
        </div>
      </div>
    </>
  )
}

export default Post
