import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/shared/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { FieldValues } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import React from "react";

type WithClassName = { className?: string };
type WithIcon = { icon?: LucideIcon };
type WithAstrix = { noAstrix?: boolean };
type WithExtraClasses = {
  labelClassName?: string;
  formItemClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
  divClassName?: string;
};

type BaseFieldProps<T extends FieldValues> = {
  control: any;
  name: keyof T & string;
  label?: string;
};
const renderLabel = (label?: string, noAstrix: boolean = false) =>
  label ? (
    <>
      {label}
      {!noAstrix && <span className="text-red-500"> *</span>}
    </>
  ) : null;

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  noAstrix,
  labelClassName,
  formItemClassName,
  iconClassName,
  inputClassName,
  divClassName,
  ...props
}: BaseFieldProps<T> & WithIcon & WithAstrix & WithExtraClasses & Omit<React.ComponentProps<typeof Input>, "name" | "value" | "onChange">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={clsx("justify-start", labelClassName)}>{renderLabel(label, noAstrix)}</FormLabel>
          <FormControl>
            <div className={clsx("relative", divClassName)}>
              {Icon && <Icon className={clsx("absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", iconClassName)} />}
              <Input type="password" placeholder="••••••" {...field} {...props} className={clsx(Icon && "pl-8", inputClassName)} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  noAstrix,
  labelClassName,
  formItemClassName,
  iconClassName,
  inputClassName,
  divClassName,
  valueAsNumber,
  ...props
}: BaseFieldProps<T> & { type?: string; placeholder?: string; valueAsNumber?: boolean } & WithIcon &
  WithAstrix &
  WithExtraClasses &
  Omit<React.ComponentProps<typeof Input>, "name" | "value" | "onChange">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={clsx("justify-start", labelClassName)}>{renderLabel(label, noAstrix)}</FormLabel>

          <FormControl>
            <div className={clsx("relative", divClassName)}>
              {Icon && <Icon className={clsx("absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", iconClassName)} />}

              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                {...props}
                value={field.value ?? ""}
                onChange={(e) => {
                  if (valueAsNumber) {
                    field.onChange(e.target.value === "" ? undefined : e.target.valueAsNumber);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                className={clsx(Icon && "pl-8 text-right", inputClassName)}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  noAstrix,
  labelClassName,
  formItemClassName,
  inputClassName,
  divClassName,
  valueAsNumber,
  ...props
}: BaseFieldProps<T> & {
  options: { label: string; value: string }[];
  placeholder?: string;
  valueAsNumber?: boolean;
} & WithAstrix &
  WithExtraClasses &
  Omit<React.ComponentProps<typeof Select>, "name" | "value" | "onChange">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={clsx("justify-start", labelClassName)}>{renderLabel(label, noAstrix)}</FormLabel>
          <FormControl>
            <Select
              // convert string -> number if valueAsNumber is true
              onValueChange={(val) => field.onChange(valueAsNumber ? Number(val) : val)}
              defaultValue={field.value?.toString()}
              {...props}
            >
              <SelectTrigger className={clsx(inputClassName, divClassName)}>
                <SelectValue placeholder={placeholder ?? "Select…"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  noAstrix,
  labelClassName,
  formItemClassName,
  inputClassName,
  divClassName,
  ...props
}: BaseFieldProps<T> & { placeholder?: string } & WithAstrix &
  WithExtraClasses &
  Omit<React.ComponentProps<typeof Textarea>, "name" | "value" | "onChange">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={clsx("justify-start", labelClassName)}>{renderLabel(label, noAstrix)}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} {...props} className={clsx(inputClassName, divClassName)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  noAstrix,
  defaultChecked = false,
  labelClassName,
  formItemClassName,
  inputClassName,
  divClassName,
  ...props
}: BaseFieldProps<T> &
  WithAstrix &
  WithExtraClasses & { defaultChecked?: boolean } & Omit<React.ComponentProps<typeof Checkbox>, "name" | "checked" | "onChange">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={clsx("flex items-center justify-start space-x-2 space-y-0", formItemClassName)}>
          <FormControl>
            <Checkbox
              checked={field.value ?? defaultChecked}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              {...props}
              className={clsx(inputClassName, divClassName)}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={labelClassName}>{renderLabel(label, noAstrix)}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
