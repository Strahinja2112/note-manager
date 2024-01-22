import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function RootLayout({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex border border-transparent flex-row items-stretch justify-center min-h-screen",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
