import { cn } from "@renderer/utils";

export default function Editor({
  children,
  className
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("flex-1 overflow-scroll h-screen", className)}>{children}</div>;
}
