import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
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
  const asdf = useRef(null)
  return (
    <>
      <Input
        type='text'
        placeholder='Title'
        value={input}
        className='rounded-sm'
        onChange={(e) => {
          setInput(e.currentTarget.value)
        }}
      ></Input>
      <p className='text-xs relative right-0 mt-1 mb-4 text-right'>{input.length}/300</p>
    </>
  )
}

function Post() {
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '240px', marginTop: '16px', marginRight: '16px', flexShrink: 0 }}>
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

        <Separator orientation='vertical' className='border-black' />
        {/*얘는 대체 왜 안보일까요??????????  */}
        <div style={{ marginLeft: '16px' }}>
          <h1>Create post</h1>
          <div style={{ height: '60px' }}>
            {' '}
            {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
            <br />
          </div>
          <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', gap: '8px' }}>
            <Button size='sm' variant='destructive'>
              Text
            </Button>
            <Button size='sm' variant='destructive'>
              Images & Video
            </Button>
            <Button size='sm' variant='destructive'>
              Link
            </Button>
          </div>

          <InputTitle />
          <Editor
            initialValue=' '
            previewStyle='vertical'
            height='200px'
            initialEditType='wysiwyg'
            useCommandShortcut={false}
            placeholder='Body'
          />
        </div>
      </div>
    </>
  )
}

export default Post
