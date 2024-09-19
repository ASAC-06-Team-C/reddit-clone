import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import InputTitle from '@/components/InputTitle'

function TextEditor() {
  function request() {
    const requestObject = {
      title: titleRef?.current?.value,
      text: textRef?.current.getInstance().getMarkdown(),
      // 만약 그냥 HTML 형식 받아오고 싶으면 getHTML
      // 자세한건 https://nhn.github.io/tui.editor/latest/ToastUIEditor
    }
    console.log(requestObject)
  }
  const titleRef = useRef(null)
  const textRef = useRef(null)
  return (
    <>
      <InputTitle reference={titleRef} />
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
        <Button size='sm' className='font-semibold' onClick={(e) => request()}>
          Save Draft
        </Button>
        <Button size='sm' className='font-semibold' onClick={(e) => request()}>
          Post
        </Button>
        {/* 1. ref로 titlelength 찾아서 setValid 사용 -> 이러면 valid값 바뀔때만 렌더
  2. ref InputTitle 값 그대로 가지고 와서 Valid를 여기서 정의?
        */}
      </div>
    </>
  )
}

export default TextEditor
