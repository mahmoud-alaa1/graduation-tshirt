"use client";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    username: z.string({ required_error: "لازم تدخل اسمك" }).min(1, {
      message: "لازم تدخل اسمك",
    }),
    type: z.enum(["half", "full"], {
      required_error: "لازم تختار نوع التشيرت",
    }),
    size: z.enum(
      ["lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"] as const,
      {
        required_error: "لازم تختار حجم التشيرت",
      },
    ),
    payment: z.enum(["contact", "upload"], {
      required_error: "لازم تختار طريقة الدفع",
    }),
    paymentProof: z
      .any()
      .refine(
        (file) => file instanceof File || file === undefined,
        "لازم ترفع صورة لو اخترت تحويل",
      )
      .optional(),
  })
  .refine(
    (data) => data.payment !== "upload" || data.paymentProof instanceof File,
    {
      path: ["paymentProof"],
      message: "ارفع صورة الدفع لو اخترت تحويل",
    },
  );

type formType = z.infer<typeof formSchema>;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SizesTable from "./SizesTable";
import { FormInput } from "./forms/FormInput";
import { RadioGroupField } from "./forms/FormRadioGroup";
import { Input } from "./ui/input";
export default function TshirtForm() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: formType) {
    console.log(values);
  }

  const paymentMethod = useWatch({
    control: form.control,
    name: "payment",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-xl font-medium"
        dir="rtl"
      >
        <FormInput<formType>
          control={form.control}
          name="username"
          label="الاسم"
          className="max-w-sm"
          autoComplete="name"
          placeholder="اكتب اسمك ..."
          type="text"
        />
        <RadioGroupField<formType>
          label="نوع التشيرت"
          control={form.control}
          name="type"
          options={[
            { value: "half", label: "راوند كم" },
            { value: "full", label: "راوند نص كم" },
          ]}
          direction="rtl"
        />
        <div className="flex flex-wrap justify-between gap-4">
          <RadioGroupField<formType>
            label="حجم التشيرت"
            control={form.control}
            name="size"
            className="space-y-2"
            options={[
              { value: "lg", label: "LG" },
              { value: "xl", label: "XL" },
              { value: "2xl", label: "2XL" },
              { value: "3xl", label: "3XL" },
              { value: "4xl", label: "4XL" },
              { value: "5xl", label: "5XL" },
              { value: "6xl", label: "6XL" },
              { value: "7xl", label: "7XL" },
              { value: "8xl", label: "8XL" },
            ]}
            direction="rtl"
          />
          <SizesTable />
        </div>

        <RadioGroupField<formType>
          label="طريقة الدفع"
          control={form.control}
          name="payment"
          direction="rtl"
          options={[
            { value: "contact", label: "هتكلمني وتدفع كاش" },
            { value: "upload", label: "هرفع صورة التحويل" },
          ]}
        />

        {paymentMethod === "upload" && (
          <FormField
            control={form.control}
            name="paymentProof"
            render={({ field }) => (
              <FormItem className="max-w-sm space-y-2">
                <FormLabel>صورة التحويل</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="cursor-pointer bg-blue-400 hover:bg-blue-500"
        >
          احجز
        </Button>
      </form>
    </Form>
  );
}
