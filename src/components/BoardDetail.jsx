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

function BoardVoteComponent({ isVoted, postVoteCount, url, postNo, userNo, setIsVoted }) {
  // isVoted에 따른 컴포넌트 속성
  // isVoted : NONE/LIKE/UNLIKE 중 하나
  const { upvote, downvote } =
    {
      NONE: {
        upvote: { variant: 'ghost', iconSrc: '/img/up-arrow.svg', vote: 'LIKE' },
        downvote: { variant: 'ghost', iconSrc: '/img/up-arrow-svgrepo-com.svg', vote: 'UNLIKE' },
      },
      LIKE: {
        upvote: { variant: 'destructive', iconSrc: '/img/up-arrow.svg', vote: 'NONE' },
        downvote: { variant: 'ghost', iconSrc: '/img/up-arrow-svgrepo-com.svg', vote: 'UNLIKE' },
      },
      UNLIKE: {
        upvote: { variant: 'ghost', iconSrc: '/img/up-arrow.svg', vote: 'LIKE' },
        downvote: {
          variant: 'destructive',
          iconSrc: '/img/up-arrow-svgrepo-com.svg',
          vote: 'NONE',
        },
      },
      // isVoted에 따라 map 정보 반환, 올바른 isVoted가 없으면 빈 객체 반환
    }[isVoted] || {}

  const renderIconButton = (button) => (
    <IconButton
      variant={button.variant}
      iconSrc={button.iconSrc}
      onClickEvent={onClickVote(url, postNo, userNo, button.vote, setIsVoted)}
    />
  )

  return (
    <div className='rounded-full bg-gray-200'>
      {upvote && renderIconButton(upvote)}
      {postVoteCount}
      {downvote && renderIconButton(downvote)}
    </div>
  )
}

async function onClickVote(url, postNo, userNo, postVoteType, setIsVoted) {
  setIsVoted(postVoteType)
  return fetch(url + 'vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_no: postNo,
      user_no: userNo,
      post_vote_type: postVoteType,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

function copyClipboard(copyText) {
  navigator.clipboard
    .writeText(copyText)
    .then(() => console.log('Copy 완료 : ', copyText))
    .catch((err) => console.log('Copy 실패 : ', err))
}

function BoardDetail({ className = null, props = null }) {
  const url = 'http://localhost:8080/posts/'
  const { id } = useParams()
  const postNo = props ? props.post_no : id
  const fullUrl = url + postNo

  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState(props)
  const [diffDate, setDiffDate] = useState(null)
  const [isVoted, setIsVoted] = useState('NONE')

  useEffect(() => {
    if (!props)
      fetch(fullUrl, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setContent(data)
        })
        .catch((err) => console.log('Error : ', err))
        .finally(() => setLoading(false))
    else {
      setContent(props)
      setLoading(false)
    }
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
      setIsVoted(content.is_voted)
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
        <Card className={'w-full ' + className}>
          <CardHeader>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={'/img/blank-profile-picture-973460_960_720.webp'} />
                  <AvatarFallback>KOR</AvatarFallback>
                </Avatar>
                <div>{content.author.user_nickname}</div>
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
              <BoardVoteComponent
                isVoted={isVoted}
                postVoteCount={content.post_vote_count}
                url={url}
                postNo={postNo}
                userNo={content.author.user_no}
                setIsVoted={setIsVoted}
              />
              <IconTextButton
                variant='secondary'
                iconSrc={'/img/306434.svg'}
                text={content.post_comment_count}
              />
              <IconTextButton
                variant='secondary'
                iconSrc={'/img/share-arrows.svg'}
                text='Share'
                onClick={copyClipboard(fullUrl)}
              />
            </div>
          </CardFooter>
        </Card>
      </>
    )
  }
}

export default BoardDetail
