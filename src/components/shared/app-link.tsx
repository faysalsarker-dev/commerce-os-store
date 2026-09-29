import type { AppLinkProps } from "@/types/nav-item.type";

export function AppLink({ children, ...props }: AppLinkProps) {
  return <a {...props}>{children}</a>;
}
