import React, { ComponentProps } from "react";

type Props = {};

export default function Button({ className, children, ...props }: ComponentProps<"button">) {
  return <button>Button</button>;
}
