import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Link, Outlet } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'

function MenuBar() {
  return (
    <>
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
    </>
  )
}

function ChangeTypeLink({ linkTo, buttonName }) {
  return (
    <>
      <Link to={linkTo}>
        <Button size='sm' variant='ghost' className='font-semibold'>
          {buttonName}
        </Button>
      </Link>
    </>
  )
}

function Post() {
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <MenuBar />
        <Separator orientation='vertical' />
        <div style={{ marginLeft: '32px', width: '60%' }}>
          <h1>Create post</h1>
          <div style={{ height: '60px' }}>
            {' '}
            {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
            <br />
          </div>
          <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', gap: '8px' }}>
            <ChangeTypeLink linkTo={'/'} buttonName={'Text'} />
            <ChangeTypeLink linkTo={'/image'} buttonName={'Images & Video'} />
            <ChangeTypeLink linkTo={'/link'} buttonName={'Link'} />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Post
