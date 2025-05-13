import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  options: Option[];
  direction?: "rtl" | "ltr";
  className?: string;
}

export function RadioGroupField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  direction = "ltr",
  className,
}: RadioGroupFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              id={name}
              dir={direction}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col space-y-1", className)}
            >
              {options.map((option, idx) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-y-0 space-x-0.5"
                >
                  <FormControl>
                    <RadioGroupItem id={name + idx} value={option.value} />
                  </FormControl>
                  <FormLabel htmlFor={name + idx} className="font-normal">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
