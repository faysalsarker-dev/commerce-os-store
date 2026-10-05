import type { ReactNode } from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  title: string;
  highlight?: string;
  as?: HeadingTag;
  className?: string;
  action?: "highlight" | "underline";
}

export function Title({
  title,
  highlight,
  as: Heading = "h2",
  className,
  action="highlight",
}: TitleProps) {
  const highlightIndex = highlight ? title.indexOf(highlight) : -1;
  let content: ReactNode = title;

  if (highlightIndex >= 0 && highlight) {
    content = (
      <>
        {title.slice(0, highlightIndex)}
        <Highlighter color="#87CEFA" action={action}>
          {highlight}
        </Highlighter>
        {title.slice(highlightIndex + highlight.length)}
      </>
    );
  }

  return (
    <Heading  className={cn("text-2xl font-semibold tracking-tight md:text-3xl ", className)}>
      {content}
    </Heading>
  );
}