import { Input } from '@/components/ui/input'

function CommentInput({ setInputState }) {
  const handleState = () => {
    setInputState((prevState) => !prevState)
  }

  return <Input type='text' placeholder='Add a comment' onClick={handleState} />
}

export default CommentInput
