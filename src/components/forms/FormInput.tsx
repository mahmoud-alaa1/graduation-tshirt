import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormInputProps<TFormValues extends Record<string, unknown>> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  dir?: string;
  style?: {
    [key: string]: string;
  };
};

export function FormInput<TFormValues extends Record<string, unknown>>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className,
  autoComplete,
  dir,
  style,
}: FormInputProps<TFormValues>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Input
              style={style}
              dir={dir}
              autoComplete={autoComplete}
              id={name}
              className={cn(className)}
              {...field}
              value={(field.value as string) ?? ""}
              placeholder={placeholder}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
