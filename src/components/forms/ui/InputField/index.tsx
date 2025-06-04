import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type InputFieldProps<I extends boolean> = {
  description?: string;
  label: string;
  name: string;
  textarea?: I;
} & InputHTMLAttributes<
  I extends true ? HTMLTextAreaElement : HTMLInputElement
>;

const InputField = <I extends boolean>({
  description,
  label,
  name,
  textarea,
  ...rest
}: InputFieldProps<I>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      defaultValue={rest.defaultValue ?? ""}
      name={name}
      render={({ field }) => {
        const inputElement = textarea ? (
          <Textarea
            className="resize-none"
            placeholder="Escribe aquí..."
            {...rest}
            {...field}
          />
        ) : (
          <Input autoComplete="off" {...field} {...rest} />
        );

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>{inputElement}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

InputField.displayName = "InputField";

export default InputField;
