"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", user);
      console.log("Login response", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        router.push("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.log("Error", error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = (e: any) => {
    e.preventDefault();
    // await axios.post("/api/users/forgotpassword", { email: user.email });
    router.push("/forgotpassword");
  };

  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black items-center justify-center h-screen flex flex-col'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Welcome to Echo FeedBack
      </h2>
      <Toaster />

      <form className='my-8' onSubmit={onLogin}>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email'>Email Address</Label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='email'
            type='text'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder='email'
          />
        </LabelInputContainer>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='password'>Password</Label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='password'
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='password'
          />
        </LabelInputContainer>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

        <div className='flex flex-col space-y-4'>
          <button
            disabled={loading}
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'
          >
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              Log in &rarr;
            </span>
            <BottomGradient />
          </button>
          <button
            onClick={onForgotPassword}
            disabled={loading}
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          >
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              Forgot Password
            </span>
            <BottomGradient />
          </button>
          <button
            disabled={loading}
            onClick={() => router.push("/signup")}
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          >
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              New User, create a new account
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
