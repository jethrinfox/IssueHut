import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FC, type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

export type SelectOptions = {
  text: string;
  value: string;
}[];

type SelectFieldProps = {
  description?: string;
  label: string;
  name: string;
  options: SelectOptions;
} & InputHTMLAttributes<HTMLSelectElement>;

const SelectField: FC<SelectFieldProps> = ({
  description,
  label,
  options,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      defaultValue={props.defaultValue ?? ""}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ text, value }) => (
                <SelectItem key={value} value={value}>
                  {text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
