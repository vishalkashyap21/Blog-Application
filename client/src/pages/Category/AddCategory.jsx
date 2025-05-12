import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";

const AddCategory = () => {
  // Zod schema for validation
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 words"),
    slug: z.string().min(3, "Name must be at least 3 words"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });


  const catageroyName = form.watch("name");
  useEffect(() => {
   
    if (catageroyName) {
      const slug = slugify(catageroyName, { lower: true });
      form.setValue("slug", slug);
    }
  },[catageroyName]);
  
 

  // async function onSubmit(values) {
  //   try {
  //     const response = await fetch(
  //       `${getEnv("VITE_API_BASE_URL")}/category/add`,
  //       {
  //         method: "post",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify(values),
  //       }
  //     );
  //     const data = await response.json();
  //     if (!response.ok) {
  //       return showToast("error", data.message);
  //     }
  //    form.reset()
  //     showToast("success", data.message);
  //   } catch (error) {
  //     showToast("error", error.message);
  //   }
  // }
  async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            form.reset()
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }
  return (
    <div>
      <Card className="pt -5 max-w-screen-md mx-auto">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full max-w-sm"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
