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
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { type FC, type InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type SelectOptions = {
  text: string;
  value: string;
}[];

type ComboboxFieldProps = {
  description?: string;
  label: string;
  name: string;
  options: SelectOptions;
} & InputHTMLAttributes<HTMLSelectElement>;

const ComboboxField: FC<ComboboxFieldProps> = ({
  description,
  label,
  options,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={props.defaultValue ?? ""}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem className="flex  flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                    role="combobox"
                    variant="outline"
                  >
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.text
                      : "Elige una opción"}
                    <ArrowDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    className="h-9"
                    placeholder={props.placeholder ?? "Buscar..."}
                  />
                  <CommandList>
                    <CommandEmpty>{"Ingresa una busqueda"}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            field.onChange(option.value);
                          }}
                          value={String(option.text)}
                        >
                          {option.text}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ComboboxField;
