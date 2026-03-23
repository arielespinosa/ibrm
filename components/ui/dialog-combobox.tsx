"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { ChevronsUpDown } from "lucide-react"

export type DialogComboboxItems = {
  value: string;
  label: string;
}

type DialogComboboxProps = {
  placeholder?: string;
  items: DialogComboboxItems[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function DialogCombobox({placeholder, items, value = "", onChange}: DialogComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="rounded-none w-full text-white/40 bg-white/5 border border-white/10 text-sm justify-between hover:text-white hover:bg-white/5 hover:border-[#c9a55a]"
        >
          {value && value.trim()
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0 rounded-none bg-[#171718] text-white/40 border border-white/10">
        <Command className="bg-[#171718] text-white/40">
          <CommandInput placeholder={placeholder} className="rounded-none border-none border-0"/>
          <CommandList>
            <CommandEmpty>No hay elementos disponibles</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="
                  transition-colors
                  !text-white/40
                  !bg-[#171718]
                  hover:!bg-[#171718]
                  hover:!text-[#c9a55a]
                  data-[highlighted]:bg-[#171718]
                  data-[highlighted]:text-[#c9a55a]
                ">
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
