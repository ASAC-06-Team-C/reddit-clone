import { useState, createContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'
import DraftButton from '@/components/DraftButton'
import ChangeTypeLink from '@/components/ChangeTypeLink'

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
  const request = await fetch(`http://localhost:8080/drafts/?user_no=${dummyUserNo}`)
  const response = await request.json()
  return response
}

function Post() {
  const [draft, setDraft] = useState([])

  useEffect(() => {
    getDrafts().then((response) => {
      setDraft(() => response)
    })
  }, [draft])
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
            <ChangeTypeLink linkTo={'/post/image'} buttonName={'Images & Video'} />
            <ChangeTypeLink linkTo={'/post/link'} buttonName={'Link'} />
          </div>
          <Outlet />
        </TitleContextProvider>
      </div>
    </>
  )
}

export { Post, CreatedContext }
