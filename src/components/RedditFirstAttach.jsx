import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function RedditFirstAttach() {
  const [arraySortBy, setArraySortBy] = useState('best')
  const [viewType, setViewType] = useState('cardView')

  return (
    <>
      {console.log(`뭐가 렌더링이 되니??`)}
      <div className='relative left-[45%] flex flex-low mt-1'>
        <Select
          onValueChange={(value) => {
            setArraySortBy(value)
          }}
        >
          <SelectTrigger className='w-[100px] bg-blue-500 p-4 shadow-md'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='best'>Best</SelectItem>
            <SelectItem value='hot'>Hot</SelectItem>
            <SelectItem value='new'>New</SelectItem>
            <SelectItem value='top'>Top</SelectItem>
            <SelectItem value='rising'>Rising</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setViewType(value)
          }}
        >
          <SelectTrigger className='w-[120px] right-0 bg-blue-500 p-4 shadow-md'>
            <SelectValue placeholder='View' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='cardView'>Card View</SelectItem>
            <SelectItem value='Compact'> Compact View</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default RedditFirstAttach
