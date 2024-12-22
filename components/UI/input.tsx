import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // CC: Do you even know what `cn` does? or it's purpose?
          // Look into `cn` function and it's dependencies!!
          // You are blindly using it without understanding it's purpose.
          "mt-1 block w-full p-2",
          "border border-gray-300 rounded ",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
