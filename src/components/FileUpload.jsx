import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'
import { useRef, useState } from 'react'
import ValidButton from '@/components/ValidButton'

function UploadFile() {
  const [isValid, setIsValid] = useState(true)

  const titleRef = useRef(null)
  const uploadRef = useRef(null)

  async function request(isDraft) {
    const requestObject = {
      user_no: 0,
      post_title: titleRef?.current?.value,
      post_content: uploadRef?.current?.value,
      post_draft: isDraft,
    }
    console.log(titleRef?.current?.value)
    const response = await fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestObject),
    })

    const data = await response.json()
    console.log(data)
    // 추후 toast 추가
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
        <ValidButton eventFunction={() => request(true)} isValid={isValid}>
          Save Draft
        </ValidButton>
        <ValidButton eventFunction={() => request(false)} isValid={isValid} z>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default UploadFile
