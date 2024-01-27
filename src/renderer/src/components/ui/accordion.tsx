import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Folder, FolderOpen } from "lucide-react";
import * as React from "react";

import { cn } from "@renderer/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    level: number;
  }
>(({ className, level, children, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("relative", className)} {...props}>
    {/* <div
      style={{
        left: level * 10 + "px"
      }}
      className="absolute translate-x-1.5 translate-y-[25px] top-0 h-full bg-muted-foreground/30 w-[1px]"
    /> */}
    {children}
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Header className="flex duration-500">
      <AccordionPrimitive.Trigger
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex flex-1 items-center text-muted-foreground gap-2 py-1 transition-all text-sm",
          className
        )}
        {...props}
      >
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200 -rotate-90",
            isOpen && "rotate-0"
          )}
        />
        {isOpen ? (
          <FolderOpen className="h-3.5 w-3.5 -ml-1.5 shrink-0 transition duration-200" />
        ) : (
          <Folder className="h-3.5 w-3.5 -ml-1.5 shrink-0 transition duration-200" />
        )}
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
