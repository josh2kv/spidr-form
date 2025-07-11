import * as React from "react";
import { cn } from "@/lib/utils";

const formatPin = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Limit to 16 digits
  const limitedDigits = digits.slice(0, 16);

  // Add dashes at positions 4, 9, 14
  let formatted = "";
  for (let i = 0; i < limitedDigits.length; i++) {
    if (i === 4 || i === 8 || i === 12) {
      formatted += "-";
    }
    formatted += limitedDigits[i];
  }

  return formatted;
};

function PinInput({
  className,
  ref,
  onChange,
  onKeyDown,
  onPaste,
  ...props
}: React.ComponentProps<"input">) {
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    // Format the input
    const formattedValue = formatPin(inputValue);

    // Update the input value
    e.target.value = formattedValue;

    // Calculate new cursor position
    const originalLength = inputValue.length;
    const newLength = formattedValue.length;
    const lengthDiff = newLength - originalLength;

    // Adjust cursor position after formatting
    setTimeout(() => {
      const newCursorPos = Math.min(
        cursorPosition + lengthDiff,
        formattedValue.length
      );
      e.target.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);

    if (onChange) {
      onChange(e);
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const cursorPosition = target.selectionStart || 0;

    // Handle backspace over dashes
    if (e.key === "Backspace" && cursorPosition > 0) {
      const charBeforeCursor = target.value[cursorPosition - 1];
      if (charBeforeCursor === "-") {
        // Remove the dash and the digit before it
        const newValue =
          target.value.slice(0, cursorPosition - 2) +
          target.value.slice(cursorPosition);
        target.value = newValue;
        setTimeout(() => {
          target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
        }, 0);
        e.preventDefault();
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Get pasted content
    const pastedText = e.clipboardData.getData("text");

    // Format the pasted content
    const formattedValue = formatPin(pastedText);

    // Update the input value
    const target = e.target as HTMLInputElement;
    target.value = formattedValue;

    // Trigger change event
    const changeEvent = new Event("change", { bubbles: true });
    target.dispatchEvent(changeEvent);

    if (onPaste) {
      onPaste(e);
    }
  };

  return (
    <input
      type="text"
      data-slot="input"
      maxLength={19}
      autoComplete="off"
      placeholder="1234-1234-1234-1234"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      onChange={handlePinChange}
      onKeyDown={handlePinKeyDown}
      onPaste={handlePinPaste}
      ref={ref}
      {...props}
    />
  );
}

export { PinInput };
