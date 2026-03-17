"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownSelectOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: DropdownSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  matchWidth?: boolean;
  hasError?: boolean;
}

export function DropdownSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select one...",
  disabled = false,
  id,
  className,
  matchWidth = true,
  hasError = false,
}: DropdownSelectProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption?.label ?? placeholder;

  const updatePosition = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: matchWidth ? rect.width : Math.max(rect.width, 160),
    });
  }, [matchWidth]);

  const openDropdown = React.useCallback(() => {
    if (disabled) return;
    updatePosition();
    setOpen(true);
    setHighlightedIndex(
      value ? options.findIndex((o) => o.value === value) : 0,
    );
  }, [disabled, value, options, updatePosition]);

  const closeDropdown = React.useCallback(() => {
    setOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectOption = React.useCallback(
    (option: DropdownSelectOption) => {
      onValueChange(option.value);
      closeDropdown();
      triggerRef.current?.focus();
    },
    [onValueChange, closeDropdown],
  );

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      )
        return;
      closeDropdown();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeDropdown]);

  React.useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex]);

  React.useEffect(() => {
    if (!open) return;
    const handleScrollOrResize = () => {
      updatePosition();
    };
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, updatePosition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i < options.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : options.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          selectOption(options[highlightedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const panel = open && typeof document !== "undefined" && (
    <div
      ref={panelRef}
      className={cn(
        "z-50 max-h-[var(--radix-select-content-available-height,280px)] min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
        "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
      )}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      role="listbox"
      aria-activedescendant={
        highlightedIndex >= 0
          ? `dropdown-option-${options[highlightedIndex]?.value}`
          : undefined
      }
    >
      <div className="p-1">
        {options.map((option, i) => (
          <div
            key={option.value}
            ref={(el) => {
              optionRefs.current[i] = el;
            }}
            id={`dropdown-option-${option.value}`}
            role="option"
            aria-selected={value === option.value}
            className={cn(
              "relative flex w-full cursor-pointer items-center rounded-sm px-3 py-2.5 text-sm outline-none transition-colors",
              value === option.value && "bg-primary/10 text-foreground",
              i === highlightedIndex && "bg-primary/15 text-foreground",
              i !== highlightedIndex &&
                value !== option.value &&
                "text-foreground hover:bg-primary/10",
              "active:bg-primary/20",
            )}
            onMouseEnter={() => setHighlightedIndex(i)}
            onMouseDown={(e) => {
              e.preventDefault();
              selectOption(option);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={displayText}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border bg-[#111] px-4 py-3 text-left text-sm text-foreground transition-all duration-200",
          hasError ? "border-primary/60" : "border-border",
          "hover:bg-[#1a1a1a] focus:border-primary/50 focus:outline-none focus:shadow-[0_0_20px_rgba(143,56,72,0.25)]",
          !selectedOption && "text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={openDropdown}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 opacity-50", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {typeof document !== "undefined" && createPortal(panel, document.body)}
    </div>
  );
}
