import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ChangeTypeLink({ linkTo, buttonName }) {
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
