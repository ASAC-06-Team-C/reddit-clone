import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ChangeTypeLink({ buttonName }) {
  return (
    <>
      <Link>
        <Button size='sm' variant='ghost' className='font-semibold'>
          {buttonName}
        </Button>
      </Link>
    </>
  )
}
