// 라이브러리
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useState } from 'react'

// 외부 자료
import BoardMock from '@/mock/BoardMock.json'

// 컴포넌트
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

function Board() {
  const boardData = BoardMock[0]

  const [comments, setComments] = useState(boardData.comments)
  const [likes, setLikes] = useState(boardData.likes)

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={'img/blank-profile-picture-973460_960_720.webp'} />
                <AvatarFallback>KOR</AvatarFallback>
              </Avatar>
              <div>강석훈</div>
              <div>•</div>
              <div>14 days ago</div>
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
        <CardContent>
          <div
            className='prose'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(boardData.contents)),
            }}
          ></div>
        </CardContent>
        <CardFooter>
          <div className='flex gap-2'>
            <div className='rounded-full bg-gray-200'>
              <IconButton variant='ghost' iconSrc={'img/up-arrow.svg'} />
              {likes}
              <IconButton variant='ghost' iconSrc={'img/up-arrow-svgrepo-com.svg'} />
            </div>
            <IconTextButton variant='secondary' iconSrc={'img/306434.svg'} text={comments} />
            <IconTextButton variant='secondary' iconSrc={'img/share-arrows.svg'} text='Share' />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default Board
