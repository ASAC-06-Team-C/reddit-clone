import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function Header({ children }) {
  return (
    <>
      <div style={{ height: '56px', display: 'flex' }}>
        <div style={{ width: '280px' }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a href='/home'>
                  <img src='../assets/reddit.png'></img>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Reddit Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div style={{ maxWidth: '560px' }}>
          <Input type='text' placeholder='Search Reddit'></Input>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open profile menu</p>
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
