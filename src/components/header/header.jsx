import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
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
          marginTop: '4px',
        }}
      >
        <div style={{ minWidth: '280px' }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a href='/home'>
                  <img
                    src='src/components/header/reddit.png'
                    style={{ width: '80%', height: '80%' }}
                  ></img>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Reddit Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div style={{ minWidth: '560px' }}>
          <Input type='text' className='h-10' placeholder='Search Reddit'></Input>
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
      <Separator />
      {children}
    </>
  )
}

export default Header
