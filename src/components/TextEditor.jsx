import { Editor } from '@toast-ui/react-editor'

function TextEditor() {
  return (
    <>
      <Editor
        initialValue=' '
        previewStyle='vertical'
        height='200px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        placeholder='Body'
      />
    </>
  )
}

export default TextEditor
