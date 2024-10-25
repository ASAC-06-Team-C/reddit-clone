import { Button } from '@/components/ui/button'

export default function ValidButton({ children, eventFunction, isValid }) {
  if (isValid) {
    return (
      <>
        <Button size='sm' className='font-semibold' onClick={(e) => eventFunction()}>
          {children}
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button size='sm' className='font-semibold' variant='destructive'>
          {children}
        </Button>
      </>
    )
  }
}
