import { cn } from "@renderer/utils";
import { ComponentProps, forwardRef } from "react";

const Editor = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  )
);

Editor.displayName = "Editor";

export default Editor;
