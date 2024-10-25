import { useState, createContext } from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@/index.css'

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

function ChangeTypeLink({ linkTo, buttonName }) {
  return (
    <>
      <Link to={linkTo}>
        <Button size='sm' variant='ghost' className='font-semibold'>
          {buttonName}
        </Button>
      </Link>
    </>
  )
}

function Post() {
  return (
    <>
      <div style={{ marginLeft: '32px', width: '60%' }}>
        <h1>Create post</h1>
        <div style={{ height: '60px' }}>
          {' '}
          {/* 나중에 여기에 커뮤니티 select기능 추가 계획*/}
          <br />
        </div>
        <TitleContextProvider>
          <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', gap: '8px' }}>
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
