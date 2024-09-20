import { useState } from 'react'
import '@/App.css'
import RedditReactHeader from '@/RedditReactHeader'
import RedditFirstAttachPage from '@/RedditFirstAttachPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RedditReactHeader />
      <RedditFirstAttachPage />
    </>
  )
}

export default App
