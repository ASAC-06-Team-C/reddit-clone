import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Editor } from '@toast-ui/react-editor'
import { Link, Outlet } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'

function InputTitle() {
  const [title, setTitle] = useState('')
  const [isValid, setIsValid] = useState(true)
  const titleValidRef = useRef(null)

  function inputValidation(string) {
    if (!string) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  useEffect(() => {
    const checkClickOutside = (event) => {
      if (!titleValidRef?.current?.contains(event.target)) {
        inputValidation(title)
      }
    }
    document.addEventListener('click', checkClickOutside)

    return () => {
      document.removeEventListener('click', checkClickOutside)
    }
  }, [title])

  return (
    <>
      <Input
        ref={titleValidRef}
        type='text'
        placeholder='Title'
        value={title}
        className={isValid ? 'rounded-sm' : 'rounded-sm border-red-600 border-2'}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
      ></Input>
      <div className='mt-2 mb-4 flex justify-between text-xs'>
        <p className={isValid ? 'opacity-0' : ''}>{'❗이 입력란을 작성하세요.'}</p>
        <p className='mr-2 text-right'>{title.length}/300</p>
      </div>
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

        <Separator orientation='vertical' />
        <div style={{ marginLeft: '32px', width: '60%' }}>
          <h1>Create post</h1>
          <div style={{ height: '60px' }}>
            {' '}
            {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
            <br />
          </div>
          <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', gap: '8px' }}>
            <Link to='/'>
              <Button size='sm' variant='ghost' className='font-semibold'>
                Text
              </Button>
            </Link>
            <Link to='/image'>
              <Button size='sm' variant='ghost' className='font-semibold'>
                Images & Video
              </Button>
            </Link>
            <Link to='/link'>
              <Button size='sm' variant='ghost' className='font-semibold'>
                Link
              </Button>
            </Link>
          </div>

          <InputTitle />
          <Outlet />

          <div className='flex justify-end mt-4 gap-4'>
            <Button size='sm' className='font-semibold'>
              Save Draft
            </Button>
            <Button size='sm' className='font-semibold'>
              Post
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
