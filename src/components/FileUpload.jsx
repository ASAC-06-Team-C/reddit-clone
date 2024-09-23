import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'
import { useRef, useState } from 'react'
import ValidButton from '@/components/ValidButton'

function UploadFile() {
  const [isValid, setIsValid] = useState(true)

  const titleRef = useRef(null)
  const uploadRef = useRef(null)

  function request() {
    const requestObject = {
      title: titleRef?.current?.value,
      file: uploadRef?.current.value,
    }
    console.log(requestObject)
  }
  return (
    <>
      <InputTitle reference={titleRef} isValid={isValid} setIsValid={setIsValid} />
      <div className='w-full items-center'>
        <Input
          id='picture'
          type='file'
          style={{ height: '200px', width: '100%' }}
          ref={uploadRef}
        />
      </div>
      <div className='flex justify-end mt-4 gap-4'>
        <ValidButton eventFunction={request} isValid={isValid}>
          Save Draft
        </ValidButton>
        <ValidButton eventFunction={request} isValid={isValid} z>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default UploadFile
