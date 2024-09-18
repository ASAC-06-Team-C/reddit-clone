import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import IconButton from '@/components/IconButton'

import profileImg from '@/resources/blank-profile-picture-973460_960_720.webp'
import threeDotsImg from '@/resources/three-dots.svg'
import upArrowImg from '@/resources/up-arrow.svg'
import downArrowImg from '@/resources/up-arrow-svgrepo-com.svg'
import talkImg from '@/resources/306434.svg'
import shareImg from '@/resources/share-arrows.svg'
import IconTextButton from '@/components/IconTextButton'

function Board() {
  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={profileImg} />
                <AvatarFallback>KOR</AvatarFallback>
              </Avatar>
              <div>강석훈</div>
              <div>•</div>
              <div>14 days ago</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='ghost'>
                  <img src={threeDotsImg} className='h-4 w-4'></img>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Save</DropdownMenuItem>
                <DropdownMenuItem>Hide</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className='viewer'># hello</div>
        </CardContent>
        <CardFooter>
          <div className='flex gap-2'>
            <div className='rounded-full bg-gray-200'>
              <IconButton variant='ghost' iconSrc={upArrowImg} />
              0
              <IconButton variant='ghost' iconSrc={downArrowImg} />
            </div>
            <IconTextButton variant='secondary' iconSrc={talkImg} text='0' />
            <IconTextButton variant='secondary' iconSrc={shareImg} text='Share' />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default Board
