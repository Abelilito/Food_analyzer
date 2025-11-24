import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactElement } from "react"

export function ToolTip({icon, text}: {icon: React.ReactNode, text: string}) {
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
