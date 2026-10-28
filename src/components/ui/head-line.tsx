import { Title } from '../shared/title'
import { Activity } from 'react';

interface HeadLineProps {
  firstMessage?: string
  title: string
  action?: "highlight" | "underline"
  highlight?: string
  lastMessage?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    className?: string
}

export default function HeadLine({
  firstMessage,
  title,
  highlight,
  lastMessage,
  as,
  action="underline",
  className
}: HeadLineProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        


<Activity mode={firstMessage ? "visible" : "hidden"} >
    <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {firstMessage}
        </p>
</Activity>

        <Title
          title={title}
          as={as}
          highlight={highlight}
          action={action}
          className={className}
        />

<Activity mode={lastMessage ? "visible" : "hidden"} >
    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          {lastMessage}
        </p>
</Activity>

      
      </div>
    </div>
  )
}
