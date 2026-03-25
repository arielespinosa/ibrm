"use client"

import * as React from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { X, ChevronsUpDown } from "lucide-react"

export type DialogComboboxItems = {
  value: string;
  label: string;
}

type DialogComboboxProps = {
  placeholder?: string;
  items: DialogComboboxItems[];
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export default function DialogCombobox({placeholder, items, value = null, onChange}: DialogComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const ignoreOpenRef = React.useRef(false)

  return (
    <Popover open={open} onOpenChange={(next) => {
      if (ignoreOpenRef.current) {
        ignoreOpenRef.current = false
        return
      }
      setOpen(next)
    }}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="rounded-none w-full text-white/40 bg-white/5 border border-white/10 text-sm flex items-center justify-between px-3 py-2 hover:text-white hover:border-[#c9a55a] cursor-pointer"
        >
          <span className="truncate">
            {value && value.trim() ? items.find((item) => item.value === value)?.label : placeholder}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  ignoreOpenRef.current = true 
                  onChange?.(null)
                }}
                className="flex items-center"
              >
                <X className="h-4 w-4 opacity-50 hover:opacity-100" />
              </button>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
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
                    onChange?.(currentValue === value ? null : currentValue)
                    setOpen(false)
                  }}
                  className="transition-colors !text-white/40 !bg-[#171718] hover:!bg-[#171718] hover:!text-[#c9a55a] data-[highlighted]:bg-[#171718] data-[highlighted]:text-[#c9a55a]">
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
