import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DraftCard from '@/components/DraftCard'

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
          {draft.map((item, key) => (
            <DraftCard content={item} key={key} index={key} draft={draft} setDraft={setDraft} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
