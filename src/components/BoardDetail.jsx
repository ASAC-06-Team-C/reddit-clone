import { marked } from 'marked'
import { useEffect, useState } from 'react'

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
import { useParams } from 'react-router-dom'

function BoardDetail() {
  const url = 'http://localhost:8080/posts/'
  const params = useParams()

  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState(null)
  const [diffDate, setDiffDate] = useState(null)

  useEffect(() => {
    console.log('useEffect')
    fetch(url + params.id, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setContent(data)
      })
      .catch((err) => console.log('Error : ', err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (content) {
      setDiffDate(
        Math.floor(
          ((new Date().getTime() - new Date(content.post_write_date).getTime()) /
            (24 * 60 * 60 * 1000)) *
            100,
        ) / 100,
      )
    }
  }, [content])

  if (loading) {
    return (
      <div>
        <h1>로딩중입니다.</h1>
      </div>
    )
  } else {
    return (
      <>
        <Card className='w-full'>
          <CardHeader>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={'/img/blank-profile-picture-973460_960_720.webp'} />
                  <AvatarFallback>KOR</AvatarFallback>
                </Avatar>
                {/* <div>{content.author.user_no}</div> */}
                <div>•</div>
                <div>{diffDate}일 전</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='ghost'>
                    <img src={'/img/three-dots.svg'} className='h-4 w-4'></img>
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
            <div>{content.post_title}</div>
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(content.post_content) }}
              className='prose'
            ></div>
          </CardContent>
          <CardFooter>
            <div className='flex gap-2'>
              <div className='rounded-full bg-gray-200'>
                <IconButton variant='ghost' iconSrc={'/img/up-arrow.svg'} onClickEvent={() => {}} />
                {content.post_vote_count}
                <IconButton
                  variant='ghost'
                  iconSrc={'/img/up-arrow-svgrepo-com.svg'}
                  onClickEvent={() => {}}
                />
              </div>
              <IconTextButton
                variant='secondary'
                iconSrc={'/img/306434.svg'}
                text={content.post_comment_count}
              />
              <IconTextButton variant='secondary' iconSrc={'/img/share-arrows.svg'} text='Share' />
            </div>
          </CardFooter>
        </Card>
      </>
    )
  }
}

export default BoardDetail
