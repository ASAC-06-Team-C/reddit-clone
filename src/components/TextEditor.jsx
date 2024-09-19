import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import InputTitle from '@/components/InputTitle'

function TextEditor() {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  return (
    <>
      <InputTitle />
      <Editor
        initialValue=' '
        previewStyle='vertical'
        height='200px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        placeholder='Body'
      />
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

export default TextEditor
