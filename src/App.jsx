import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import RedditReactHeader from '@/RedditReactHeader'
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
      <div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='best'>Best</SelectItem>
            <SelectItem value='hot'>Dot</SelectItem>
            <SelectItem value='new'>New</SelectItem>
            <SelectItem value='top'>Top</SelectItem>
            <SelectItem value='rising'>Rising</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default App
