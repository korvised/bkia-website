import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm",
            "focus:ring-primary focus:border-transparent focus:ring-2 focus:outline-none",
            "placeholder:text-gray-400",
            "disabled:cursor-not-allowed disabled:bg-gray-100",
            "resize-none",
            error && "border-danger focus:ring-danger",
            className,
          )}
          {...props}
        />
        {error && <p className="text-danger mt-1 text-sm">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
