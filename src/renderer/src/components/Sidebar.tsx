import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function Sidebar({ className, children, ...props }: ComponentProps<"aside">) {
  return (
    <aside className="z-[100]" {...props}>
      {/* <div className="h-8 *:rounded-full flex group w-full items-center gap-2 justify-end pr-2">
        <button className="bg-green-500 w-[20px] h-[20px] flex items-center justify-center">
          <span className="-translate-x-[0.2px] -translate-y-[1px] text-black/60">_</span>
        </button>
        <button className="bg-yellow-500 w-[20px] h-[20px] flex items-center justify-center">
          <span className="-translate-x-[0.2px] -translate-y-[1px] text-black">🗖</span>
        </button>
        <button className="bg-red-500 w-[20px] h-[20px] flex items-center justify-center">
          <X size={16} className="text-black/60" />
        </button>
      </div> */}
      <div className={cn("w-[250px] h-[100vh + 10px] overflow-auto", className)}>{children}</div>
    </aside>
  );
}
