import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import '@/index.css'

function Header({ children }) {
  return (
    <>
      <div
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ minWidth: '280px' }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a href='/home'>
                  <img src='src/components/header/reddit.png'></img>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Reddit Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div style={{ minWidth: '560px' }}>
          <Input type='text' placeholder='Search Reddit'></Input>
        </div>
        <div style={{ justifyContent: 'flex-end', marginRight: '16px' }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p style={{}}>Open profile menu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {children}
    </>
  )
}

export default Header
