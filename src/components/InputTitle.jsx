import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import '@/index.css'

function InputTitle({ reference, isValid, setIsValid }) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    function inputValidation(string) {
      if (!string) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }

    const checkClickOutside = (event) => {
      if (!reference?.current?.contains(event.target)) {
        inputValidation(title)
      }
    }
    document.addEventListener('click', checkClickOutside)

    return () => {
      document.removeEventListener('click', checkClickOutside)
    }
  }, [title])

  return (
    <>
      <Input
        ref={reference}
        type='text'
        placeholder='Title'
        value={title}
        className={isValid ? 'rounded-sm' : 'rounded-sm border-red-600 border-2'}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
      ></Input>
      <div className='mt-2 mb-4 flex justify-between text-xs'>
        <p className={isValid ? 'opacity-0' : ''}>{'❗이 입력란을 작성하세요.'}</p>
        <p className='mr-2 text-right'>{title.length}/300</p>
      </div>
    </>
  )
}

export default InputTitle
