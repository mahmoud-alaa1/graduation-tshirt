"use client";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    name: z.string({ required_error: "لازم تدخل اسمك" }).min(1, {
      message: "لازم تدخل اسمك",
    }),
    tshirtName: z
      .string({ required_error: "لازم تدخل الاسم اللي على التيشيرت" })
      .min(1, {
        message: "لازم تدخل الاسم على التيشيرت",
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
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
export default function TshirtForm() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formType) {
    console.log(values);
    let paymentProofUrl: string | null = null;

    if (values.payment === "upload" && values.paymentProof instanceof File) {
      const { data, error } = await supabase.storage
        .from("tshirt-payments")
        .upload(
          `proofs/${Date.now()}-${values.paymentProof.name}`,
          values.paymentProof,
        );

      if (error) {
        console.error("خطأ في رفع الصورة:", error);
        return;
      }

      paymentProofUrl = supabase.storage
        .from("tshirt-payments")
        .getPublicUrl(data.path).data.publicUrl;
    }

    const { error: insertError } = await supabase
      .from("tshirt_reservations")
      .insert({
        name: values.name,
        type: values.type,
        size: values.size,
        payment: values.payment,
        payment_proof: paymentProofUrl,
        tshirtName: values.tshirtName,
        totalAmount: totalAmount,
      });

    if (insertError) {
      toast.error("حصلت مشكلة ... كلم محمود علاء");
    } else {
      toast.success("تم الحجز بنجاح لو عاوز تعدل كلم محمود علاء او احمد شحاتة");

      form.reset({
        name: "",
        payment: undefined,
        paymentProof: undefined,
        size: undefined,
        type: undefined,
        tshirtName: "",
      });
    }
  }

  let totalAmount = 0;

  if (form.watch("type") === "full") {
    totalAmount = 230;
  } else {
    totalAmount = 190;
  }

  if (
    form.watch("size") !== "3xl" &&
    form.watch("size") !== "2xl" &&
    form.watch("size") !== "xl" &&
    form.watch("size") !== "lg"
  ) {
    totalAmount += 60;
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
          name="name"
          label="الاسم بالكامل"
          className="max-w-sm"
          autoComplete="name"
          placeholder="اكتب اسمك ..."
          type="text"
        />
        <FormInput<formType>
          control={form.control}
          name="tshirtName"
          label="الاسم على التيشيرت"
          className="max-w-sm"
          autoComplete="name"
          placeholder="اكتب الاسم اللي عاوزه على التيشيرت مثلا: محمود"
          type="text"
        />
        <RadioGroupField<formType>
          label="نوع التشيرت"
          control={form.control}
          name="type"
          options={[
            {
              value: "half",
              label: "راوند نص كم (190ج لو المقاس اكبر من 3XL السعر 250ج)",
            },
            {
              value: "full",
              label:
                "راوند كم السعر 230ج لو المقاس اكبر من 3XL السعر 290ج واعلى مقاس 5XL",
            },
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
            { value: "contact", label: "هتكلم شحاتة وتدفع كاش" },
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
                    placeholder="ارفع صورة التحويل"
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

        <div className="text-center text-xl font-bold text-red-500">
          المبلغ المطلوب: {totalAmount} ج
        </div>
        <Button
          type="submit"
          className="cursor-pointer bg-blue-400 p-4 hover:bg-blue-500"
        >
          احجز
        </Button>
      </form>
    </Form>
  );
}
