import { useState } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import ValidButton from '@/components/ValidButton'
import InputTitle from '@/components/InputTitle'

function TextEditor() {
  const [isValid, setIsValid] = useState(true)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  function request() {
    const requestObject = {
      title: titleRef?.current?.value,
      text: textRef?.current.getInstance().getMarkdown(),
    }
    console.log(requestObject)
  }

  // 만약 그냥 HTML 형식 받아오고 싶으면 getHTML
  // 자세한건 https://nhn.github.io/tui.editor/latest/ToastUIEditor

  return (
    <>
      <InputTitle reference={titleRef} isValid={isValid} setIsValid={setIsValid} />
      <Editor
        initialValue=' '
        previewStyle='vertical'
        height='200px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        placeholder='Body'
        ref={textRef}
      />
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

export default TextEditor
