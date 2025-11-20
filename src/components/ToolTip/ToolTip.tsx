import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactElement } from "react"

export function ToolTip({icon, text}: {icon: ReactElement, text: string}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {icon}
      </TooltipTrigger>
      <TooltipContent>
        {text}
      </TooltipContent>
    </Tooltip>
  )
}
