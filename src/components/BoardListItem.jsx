import { marked } from 'marked'
import { useState } from 'react'

import { Button } from './ui/button'
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
import IconTextButton from '@/components/IconTextButton'

function BoardListItem({ className, props }) {
  const [markdown, setMarkdown] = useState('')

  const listItem = props

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={'img/blank-profile-picture-973460_960_720.webp'} />
                <AvatarFallback>KOR</AvatarFallback>
              </Avatar>
              <div>{listItem.post_title}</div>
              <div>{listItem.user_no}</div>
              {/* user ID 를 받아와야 할 듯...*/}
              <div>{new Date(listItem.post_write_date).toString()}</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='ghost'>
                  <img src={'img/three-dots.svg'} className='h-4 w-4'></img>
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
        <CardContent>{listItem.post_content}</CardContent>
        <CardFooter>
          <div className='flex gap-2'>
            <div className='rounded-full bg-gray-200'>
              <IconButton variant='ghost' iconSrc={'img/up-arrow.svg'} />
              {listItem.post_vote_count}
              <IconButton variant='ghost' iconSrc={'img/up-arrow-svgrepo-com.svg'} />
            </div>
            <IconTextButton
              variant='secondary'
              iconSrc={'img/306434.svg'}
              text={listItem.post_comment_count}
            />
            <IconTextButton variant='secondary' iconSrc={'img/share-arrows.svg'} text='Share' />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default BoardListItem
