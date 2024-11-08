import TooltipComponent from '@/components/TooltipComponent'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import '@/App.css'
import redditLogo from '/img/reddit-logo.svg'
import redditAvatar from '/img/reddit-avatar.svg'
import { Button } from '@/components/ui/button'
import createCross from '/img/create-cross.svg'
import searchIcon from '/img/search.svg'
import DialogButton from '@/components/DialogButton'

function Header() {
  return (
    <>
      <div className='h-[56px] flex items-center justify-between sticky top-0'>
        <div className='flex'>
          <div className='min-w-[264px]'>
            <TooltipComponent message={'Go to Reddit Home'}>
              <a href='/' className='flex items-center w-32 mt-2'>
                <img src={redditAvatar} className=' mr-2 align-center'></img>
                <img src={redditLogo} className='h-6 w-20 fill-[#FF4500]'></img>
              </a>
            </TooltipComponent>
          </div>
          <div className='flex min-w-[500px] mt-1'>
            <img src={searchIcon} className='relative left-7 top-3 h-[16px] w-[16px]'></img>
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
          <TooltipComponent message={'Open profile menu'}>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipComponent>
          <DialogButton />
        </div>
      </div>
      <Separator />
    </>
  )
}

export default Header
