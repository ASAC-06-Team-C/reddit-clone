import { useState, createContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Outlet } from 'react-router-dom'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'
import DraftButton from '@/components/DraftButton'
import ChangeTypeLink from '@/components/ChangeTypeLink'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const defaultString = ''
const CreatedContext = createContext({ title: defaultString, setTitle: (state) => {} })

function TitleContextProvider({ children }) {
  const [title, setTitle] = useState('')
  return (
    <>
      <CreatedContext.Provider value={{ title, setTitle }}>{children}</CreatedContext.Provider>
    </>
  )
}

async function getDrafts() {
  const dummyUserNo = 0
  const request = await fetch(`http://3.38.116.245:8080/drafts/?user_no=${dummyUserNo}`)
  const response = await request.json()
  return response
}

function Post() {
  const [draft, setDraft] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    getDrafts().then((response) => {
      const responseObject = [...response]
      setDraft(responseObject)
    })
  }, [])
  return (
    <>
      <div className='ml-[32px] w-3/5'>
        <div className='flex items-center justify-between'>
          <h1>Create post</h1>
          <DraftButton draft={draft} setDraft={setDraft} />
        </div>
        <div className='h-[60px]'>
          {' '}
          {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
          <br />
        </div>
        <TitleContextProvider>
          <div className='flex mt-[8px] mb-[8px] gap-2'>
            <ChangeTypeLink linkTo={'/post'} buttonName={'Text'} />
            <Button
              size='sm'
              variant='ghost'
              className='font-semibold'
              onClick={() => {
                console.log('test')
                toast({
                  variant: 'destructive',
                  title: '아직 개발 중 이에요!',
                  description: '불편을 주어서 죄송합니다.',
                  action: <ToastAction altText='ok'>ok</ToastAction>,
                })
              }}
            >
              Images & Video
            </Button>
            <Button
              size='sm'
              variant='ghost'
              className='font-semibold'
              onClick={() => {
                console.log('test')
                toast({
                  variant: 'destructive',
                  title: '아직 개발 중 이에요!',
                  description: '불편을 주어서 죄송합니다.',
                  action: <ToastAction altText='ok'>ok</ToastAction>,
                })
              }}
            >
              Link
            </Button>
          </div>
          <Outlet />
        </TitleContextProvider>
      </div>
    </>
  )
}

export { Post, CreatedContext }
