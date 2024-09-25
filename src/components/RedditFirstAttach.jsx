import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CustomIntersectionObsever from '@/components/CustomIntersectionObsever'

function RedditFirstAttachPage() {
  const [arraySortBy, setArraySortBy] = useState('best')

  return (
    <>
      <div className='fixed top-[56px] left-[45%] flex flex-low mt-1'>
        <Select
          onValueChange={(value) => {
            console.log(value)
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
            console.log(value)
          }}
        >
          <SelectTrigger className='w-[100px] right-0 bg-blue-500 p-4 shadow-md'>
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

export default RedditFirstAttachPage
