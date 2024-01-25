import { cn } from "@renderer/utils";
import { ComponentProps } from "react";

export default function RootLayout({ className, children }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex bg-primary flex-row items-stretch justify-center min-h-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
