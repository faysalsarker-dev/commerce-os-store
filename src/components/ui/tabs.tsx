import * as React from "react";
import { cn } from "cn";

export function Tabs({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props}>{children}</div>;
}

export function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props}>{children}</div>;
}

export function TabsTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(className)} {...props}>
      {children}
    </button>
  );
}

export function TabsContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props}>{children}</div>;
}
