import { useState } from 'react'
import '@/RedditReactHeader.css'
import { Button } from '@/components/ui/button'

function RedditReactHeader() {
  return (
    <>
      <header>
        <div className='reddit-header-right-section'>
          <a href='http://localhost:5173/'>
            {/* <img className='reddit-logo-img' src='img/reddit-logo.png'></img> */}
          </a>
        </div>
        <div className='reddit-header-middle-section'> 검색 창 영역</div>
        <div className='reddit-header-left-section'>
          <Button className='header-user-info-button' variant='outline'>
            <img className='button-img' src='https://github.com/shadcn.png' />
          </Button>
        </div>
      </header>
    </>
  )
}

export default RedditReactHeader

//https://github.com/shadcn.png
