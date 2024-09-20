import { useState } from 'react'
import '@/RedditReactHeader.css'
import { Button } from '@/components/ui/button'

function RedditReactHeader() {
  return (
    <>
      <header className='h-14 w-100 fixed left-0 right-0 top-0 bg-[#0e1113] border-[#3e4142]'>
        <div className='float-left w-[15%] h-[100%] box-border'>
          <a href='http://localhost:5173/'>
            <img className='w-full h-full object-contain' src='img/reddit-logo.png'></img>
          </a>
        </div>
        <div className='float-left w-[65%] h-[65%] box-border'>dsafasdfdas</div>
        {/* <div className='reddit-header-middle-section'> 검색 창 영역</div> */}
        <div className='float-right w-[20%] h-[100%] box-border align-middle'>
          <Button className='relative top-[8px] left-[38%] right-0' variant='outline'>
            <img className='w-[40px] h-[40px] rounded-full' src='https://github.com/shadcn.png' />
          </Button>
        </div>
      </header>
    </>
  )
}

export default RedditReactHeader
