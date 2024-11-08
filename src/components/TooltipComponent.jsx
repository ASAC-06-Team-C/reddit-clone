import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export default function TooltipComponent({ children, message }) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent>{message}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
