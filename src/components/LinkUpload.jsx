import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'

function LinkUpload() {
  return (
    <>
      <InputTitle />
      <div>
        <Input />
      </div>
      <div className='flex justify-end mt-4 gap-4'>
        <Button size='sm' className='font-semibold'>
          Save Draft
        </Button>
        <Button size='sm' className='font-semibold'>
          Post
        </Button>
      </div>
    </>
  )
}

export default LinkUpload
