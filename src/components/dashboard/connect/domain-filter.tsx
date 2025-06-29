
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface DomainFilterProps {
  allDomains: string[];
  selectedDomains: string[];
  onFilterChange: (domains: string[]) => void;
  className?: string;
}

export function DomainFilter({
  allDomains,
  selectedDomains,
  onFilterChange,
  className,
}: DomainFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newSelection = selectedDomains.includes(currentValue)
      ? selectedDomains.filter((item) => item !== currentValue)
      : [...selectedDomains, currentValue];
    onFilterChange(newSelection);
  };

  const handleRemove = (domain: string) => {
    onFilterChange(selectedDomains.filter((item) => item !== domain));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
            <span className="truncate">
                {selectedDomains.length > 0 ? `Filtered by ${selectedDomains.length} domain(s)` : "Filter by domain..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
            <CommandInput placeholder="Search domains..." />
            <CommandList>
                <CommandEmpty>No domain found.</CommandEmpty>
                <CommandGroup>
                {allDomains.map((domain) => (
                    <CommandItem
                    key={domain}
                    value={domain}
                    onSelect={handleSelect}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        selectedDomains.includes(domain) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {domain}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
        {selectedDomains.length > 0 && (
            <div className="flex flex-wrap gap-1">
                {selectedDomains.map((domain) => (
                <Badge
                    key={domain}
                    variant="secondary"
                    className="flex items-center gap-1"
                >
                    {domain}
                    <button onClick={() => handleRemove(domain)} className="rounded-full hover:bg-muted-foreground/20">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
                ))}
            </div>
        )}
    </div>
  );
}
