import { Button } from '@/components/ui/button'

function IconTextButton({ iconSrc, variant, text }) {
  return (
    <>
      <Button size='icon' variant={variant} className='rounded-full w-auto px-3'>
        <img src={iconSrc} className='h-4 w-4 mr-2' />
        {text}
      </Button>
    </>
  )
}

export default IconTextButton
