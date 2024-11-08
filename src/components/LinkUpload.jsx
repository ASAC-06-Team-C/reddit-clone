import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'
import { useRef, useState } from 'react'
import ValidButton from '@/components/ValidButton'

function LinkUpload() {
  const [isValid, setIsValid] = useState(true)
  const titleRef = useRef(null)
  const urlRef = useRef(null)

  async function request(isDraft) {
    //user_no의 경우 추후 수정해야 합니다.

    const requestObject = {
      user_no: 0,
      post_title: titleRef?.current?.value,
      post_content: urlRef?.current?.value,
      post_draft: isDraft,
    }
    if (isDraft) {
      const response = await fetch('http://localhost:8080/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(requestObject),
      })

      const data = await response.json()
      console.log(data)
    } else {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(requestObject),
      })

      const data = await response.json()
      console.log(data)
    }

    // 추후 toast 추가
  }

  function urlValidation(value) {
    const url = value
    const isValid = URL.canParse(url)
    setIsValid(isValid)
  }

  return (
    <>
      <InputTitle reference={titleRef} isValid={isValid} setIsValid={setIsValid} />
      <div>
        <Input onChange={(e) => urlValidation(e.currentTarget.value)} ref={urlRef} />
      </div>
      <div className='flex justify-end mt-4 gap-4'>
        <ValidButton eventFunction={() => request(true)} isValid={isValid}>
          Save Draft
        </ValidButton>
        <ValidButton eventFunction={() => request(false)} isValid={isValid}>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default LinkUpload
