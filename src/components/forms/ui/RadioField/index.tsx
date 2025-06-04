import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { useFormContext } from "react-hook-form";

export type RadioOptions = {
  text: string;
  value: string;
}[];

type RadioFieldProps = {
  horizontal?: boolean;
  // description?: string;
  label: string;
  name: string;
  options: RadioOptions;
} & ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

const RadioField: FC<RadioFieldProps> = ({
  horizontal = false,
  // description,
  label,
  name,
  options,
  ...rest
}) => {
  const { control } = useFormContext();

  const className = cn(
    "flex flex-col",
    horizontal && "flex-row items-center gap-4",
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              className={className}
              defaultValue={field.value}
              onValueChange={field.onChange}
              {...rest}
            >
              {options.map(({ text, value }) => (
                <FormItem className="flex items-end gap-2" key={value}>
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{text}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {/* {description && <FormDescription>{description}</FormDescription>} */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RadioField.displayName = "RadioField";

export default RadioField;
