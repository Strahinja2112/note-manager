import { cn } from "@renderer/utils";
import { PropsWithChildren } from "react";

export default function DraggableTopbar({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <header className={cn("header cursor-pointer h-8 rounded-none bg-transparent", className)}>
      {children}
    </header>
  );
}
