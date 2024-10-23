import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import '@/App.css'
import redditLogo from '/img/reddit-logo.svg'
import redditAvatar from '/img/reddit-avatar.svg'
import { Button } from '@/components/ui/button'
import createCross from '/img/create-cross.svg'
import searchIcon from '/img/search.svg'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import LoginButton from '@/components/LoginButton'

function Header() {
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
        <div className=' flex'>
          <TooltipProvider>
            <Tooltip>
              <div style={{ minWidth: '264px' }}>
                <TooltipTrigger>
                  <a href='/' className='flex items-center w-32'>
                    <img src={redditAvatar} className=' mr-2 align-center'></img>
                    <img src={redditLogo} style={{ fill: '#FF4500' }} className='h-6 w-20'></img>
                  </a>
                </TooltipTrigger>
              </div>
              <TooltipContent>
                <p>Go to Reddit Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className='flex' style={{ minWidth: '500px' }}>
            <img src={searchIcon} className='relative left-7'></img>
            <Input type='text' className='h-10 pl-10' placeholder='Search Reddit'></Input>
          </div>
        </div>
        <div className='flex items-center justify-end, mr-2'>
          <a href='/post' className='flex items-center'>
            <Button variant='ghost' className='font-semibold mr-2'>
              <img src={createCross} className='mr-1'></img>
              Create
            </Button>
          </a>
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
          {/* <LoginButton></LoginButton> */}
        </div>
      </div>
      <Separator />
    </>
  )
}

export default Header
