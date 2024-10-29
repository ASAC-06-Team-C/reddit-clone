import { Button } from '@/components/ui/button'
import editImage from '/img/edit-button.svg'
import deleteImage from '/img/delete-button.svg'

export default function DraftList({ content }) {
  return (
    <Button variant='ghost' className='w-96 rounded h-16'>
      <div className='flex'>
        <div>
          <p className='font-bold'>{content.post_title}</p>
          <p className='text-xs text-gray-500'>{content.post_write_date}</p>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='hover:bg-gray-300'
          onClick={() => {
            console.log('test')
          }}
        >
          <img src={editImage}></img>
        </Button>
        <Button variant='ghost' size='icon' className='hover:bg-gray-300'>
          <img src={deleteImage}></img>
        </Button>
      </div>
    </Button>
  )
}
