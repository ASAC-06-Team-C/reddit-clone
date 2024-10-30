import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DraftCard from '@/components/DraftCard'

const dummy1 = {
  post_title: 'test1',
  post_write_date: String(new Date()),
}
const dummy2 = {
  post_title: 'test2',
  post_write_date: String(new Date()),
}

export default function DraftButton({ draft, setDraft }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='font-bold'>
          Drafts
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[532px] sm:rounded-sm'>
        <DialogHeader>
          <DialogTitle>Drafts</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <DraftCard content={dummy1}></DraftCard>
          <DraftCard content={dummy2}></DraftCard>
          {draft.map((item, key) => (
            <DraftCard content={item} key={key} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
