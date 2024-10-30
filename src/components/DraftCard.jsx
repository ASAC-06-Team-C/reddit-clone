import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import editImage from '/img/edit-button.svg'
import deleteImage from '/img/delete-button.svg'
import { Link } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog'

export default function DraftCard({ content, index, draft, setDraft }) {
  async function deleteDraft(index, post_no) {
    console.log(draft)
    await fetch(`http://localhost:8080/drafts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        post_no: post_no,
        user_no: 0,
      }),
    }).then(() => {
      console.log(draft)
      draft.splice(index, 1)
    })
    setDraft(draft)
  }

  return (
    <Card variant='ghost' className='w-96 rounded-[8px] h-16 hover:bg-gray-100'>
      <div className='flex'>
        <div>
          <p className='font-bold'>{content.post_title}</p>
          <p className='text-xs text-gray-500'>{content.post_write_date}</p>
        </div>
        <Link to={`${content.post_no}`}>
          <DialogClose>
            <Button variant='ghost' size='icon' className='hover:bg-gray-300' onClick={() => {}}>
              <img src={editImage}></img>
            </Button>
          </DialogClose>
        </Link>
        <Button
          variant='ghost'
          size='icon'
          className='hover:bg-gray-300'
          onClick={() => deleteDraft(index, content.post_no)}
        >
          <img src={deleteImage}></img>
        </Button>
      </div>
    </Card>
  )
}
