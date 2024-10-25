import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'

function LinkUpload() {
  //
  // URL.canParse() 를 사용해서 링크의 validation을 진행할 수 있다.
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static
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
