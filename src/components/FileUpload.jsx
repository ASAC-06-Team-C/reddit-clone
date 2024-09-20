import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'
function UploadFile() {
  return (
    <>
      <InputTitle />
      <div className='w-full items-center'>
        <Input
          id='picture'
          type='file'
          style={{ height: '200px', width: '100%' }}
          placeholder='asdf'
        />
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

export default UploadFile
