import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, File, Folder } from "lucide-react";
import * as React from "react";

import { cn } from "@renderer/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    onClose(): void;
  }
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex flex-1 items-center text-muted-foreground gap-2 py-1 font-medium transition-all duration-700",
          className
        )}
        {...props}
      >
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 -rotate-90",
            isOpen && "rotate-0"
          )}
        />
        <Folder
          fill={isOpen ? "hsl(240 5% 64.9%)" : ""}
          className="h-4 w-4 -ml-1.5 shrink-0 transition duration-200"
        />
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
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
