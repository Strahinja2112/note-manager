import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function RootLayout({ className, children }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex bg-[#0b0b0b] flex-row items-stretch justify-center min-h-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
