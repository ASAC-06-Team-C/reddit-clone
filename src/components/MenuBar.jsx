import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function MenuBar() {
  return (
    <>
      <div style={{ width: '240px', margin: '16px', flexShrink: 0 }}>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Community</AccordionTrigger>
            <AccordionContent>SubReddit1</AccordionContent>
            <AccordionContent>SubReddit2</AccordionContent>
            <AccordionContent>SubReddit3</AccordionContent>
            <AccordionContent>SubReddit4</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Recent</AccordionTrigger>
            <AccordionContent>SubReddit5</AccordionContent>
            <AccordionContent>SubReddit6</AccordionContent>
            <AccordionContent>SubReddit7</AccordionContent>
            <AccordionContent>SubReddit8</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
