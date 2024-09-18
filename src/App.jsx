import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import RedditReactHeader from '@/RedditReactHeader'
import RedditFirstAttachPage from '@/RedditFirstAttachPage'
import '@/App.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
