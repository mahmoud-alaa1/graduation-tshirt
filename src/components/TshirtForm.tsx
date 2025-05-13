"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z
    .string({
      required_error: "لازم تدخل اسمك",
    })
    .min(1, {
      message: "لازم تدخل اسمك",
    }),

  type: z.enum(["all", "mentions", "none"], {
    required_error: "لازم تختار نوع التشيرت",
  }),
  size: z.enum(["lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"], {
    required_error: "لازم تختار حجم التشيرت",
  }),
});

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
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SizesTable from "./SizesTable";
import { FormInput } from "./forms/FormInput";
export default function TshirtForm() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: formType) {
    console.log(values);
  }
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
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>النوع</FormLabel>
              <FormControl>
                <RadioGroup
                  dir="rtl"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0 space-x-0.5">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">راوند كم</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0 space-x-0.5">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">راوند نص كم</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>الحجم</FormLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col space-y-5">
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">لارج</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">اكس لارج</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">2اكس لارج</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">3اكس لارج</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          راوند نص كم
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          راوند نص كم
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          راوند نص كم
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          راوند نص كم
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0.5">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          راوند نص كم
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </div>

                <SizesTable />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-blue-400">
          احجز
        </Button>
      </form>
    </Form>
  );
}
