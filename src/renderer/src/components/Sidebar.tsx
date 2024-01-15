import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function Sidebar({ className, children, ...props }: ComponentProps<"aside">) {
  return (
    <aside className={cn("w-[250px] mt-10 h-[100vh + 10px] overflow-auto", className)} {...props}>
      {children}
    </aside>
  );
}
