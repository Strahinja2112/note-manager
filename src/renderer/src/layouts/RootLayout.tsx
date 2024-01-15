import { cn } from "@renderer/utils";
import React, { ComponentProps } from "react";

export default function RootLayout({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-row h-screen", className)} {...props}>
      {children}
    </div>
  );
}
