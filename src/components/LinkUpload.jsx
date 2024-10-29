import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputTitle from '@/components/InputTitle'
import { useRef, useState } from 'react'
import ValidButton from '@/components/ValidButton'

function LinkUpload() {
  const [isValid, setIsValid] = useState(true)
  const titleRef = useRef(null)
  const urlRef = useRef(null)

  function request() {
    const requestObject = {
      post_title: titleRef?.current?.value,
      post_content: urlRef?.current?.value,
    }
    console.log(requestObject)
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
        <ValidButton eventFunction={request} isValid={isValid}>
          Save Draft
        </ValidButton>
        <ValidButton eventFunction={request} isValid={isValid}>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default LinkUpload
