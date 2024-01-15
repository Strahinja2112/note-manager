import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function Button({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
