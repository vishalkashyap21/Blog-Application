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
import React from "react";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/image/logo-white.png";

// ✅ Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password feild required"),
});

const SignIn = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  // ✅ Form initialization
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Submit handler
  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
        
      }
      dispatch(setUser(data.user))
      navigate(RouteIndex);
      showToast("success", data.message);

      
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[20rem] p-5">
        <div className="flex justify-center items-center mb-2">
  <Link to={RouteIndex}>
  <img src={logo}  />
  </Link>
        </div>
      
        <h1 className="text-2xl font-bold text-center">Login Into Account</h1>
        <div className="">
          <GoogleLogin/>
          <div className="border my-5 flex justify-center items-start"><span className="absolute bg-white text-sm">Or</span></div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don&apos;t have an account?</p>
                <Link to={RouteSignUp} className="hover:text-blue-700">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
