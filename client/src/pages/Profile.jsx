import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { CiCamera } from "react-icons/ci";
import Dropzone from "react-dropzone";

import { setUser } from "@/redux/user/user.slice"; // (✅ Assuming you have a userSlice)
import { useNavigate } from "react-router-dom"; // (✅ You used navigate(RouteIndex), so import navigate)
import { RouteIndex } from "@/helpers/RouteName";


const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filePreview,setPreveiw]= useState()
  const [file,setFile]= useState()

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  //for debug the code use clg
  // console.log(userData);

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),
   
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password:"",
      
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  // ✅ Submit handler
  async function onSubmit(values) {
    try {
      const formData = new FormData()
      formData.append('file',file)
      formData.append('data',JSON.stringify(values))
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          
          credentials: "include",
         body:formData

        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }


const handleFileSelection=(files)=>{
const file=files[0]
const preview = URL.createObjectURL(file)
setPreveiw(preview)
setFile(file)
}


  if (loading) return <Loading />;

  return (
    <div>
      <Card className="max-w-screen-md mx-auto bg-gray-200">
        <CardContent>
          <div className="flex justify-center items-center mt-10">
            <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-28 h-28 relative group">
                    <AvatarImage src={ filePreview? filePreview : userData?.user?.avatar} />
                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center text-3xl bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                      <CiCamera color="blue" />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
     

          <div className="flex justify-center items-center border">
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
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
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full bg-blue-700 font-bold"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
