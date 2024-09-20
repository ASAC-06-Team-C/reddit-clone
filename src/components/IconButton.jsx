import { Button } from '@/components/ui/button'

function IconButton({ iconSrc, variant }) {
  return (
    <>
      <Button size='icon' variant={variant} className='rounded-full'>
        <img src={iconSrc} className='h-4 w-4'></img>
      </Button>
    </>
  )
}

export default IconButton
