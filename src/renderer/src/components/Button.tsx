import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function Button({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "px-2 py-1 rounded-md border *:text-zinc-500 border-zinc-700 hover:bg-zinc-700/40 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
