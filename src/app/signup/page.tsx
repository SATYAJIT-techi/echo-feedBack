// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";

// export default function SignupPage() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [buttonDisabled, setButtonDisabled] = useState(false);

//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     console.log("Login Page Mounted");
//   }, []);

//   const onSignup = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post("/api/users/signup", user);
//       console.log("Signup response", res.data);
//       router.push("/login");
//     } catch (error: any) {
//       console.log("Error", error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//       <h1>{loading ? "Processing" : "Signup"}</h1>
//       <hr />
//       <label htmlFor='username'>username</label>
//       <input
//         className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='username'
//         type='text'
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder='username'
//       />
//       <label htmlFor='email'>email</label>
//       <input
//         className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='email'
//         type='text'
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder='email'
//       />
//       <label htmlFor='password'>password</label>
//       <input
//         className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='password'
//         type='password'
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder='password'
//       />
//       <button
//         onClick={onSignup}
//         className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//       >
//         {buttonDisabled ? "No signup" : "Signup"}
//       </button>
//       <Link href='/login'>Visit login page</Link>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const reqBody = {
        username: user.firstName + user.lastName,
        email: user.email,
        password: user.password,
      };
      const res = await axios.post("/api/users/signup", reqBody);
      console.log("Signup response", res);
      router.push("/login");
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };
  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black items-center justify-center h-screen flex flex-col'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Welcome to Echo FeedBack
      </h2>

      <form className='my-8' onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          <LabelInputContainer>
            <Label htmlFor='firstname'>First name</Label>
            <Input
              id='firstname'
              placeholder='Tyler'
              type='text'
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor='lastname'>Last name</Label>
            <Input
              id='lastname'
              placeholder='Durden'
              type='text'
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            placeholder='projectmayhem@fc.com'
            type='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </LabelInputContainer>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            placeholder='••••••••'
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </LabelInputContainer>

        <button
          className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          type='submit'
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

        {/* <div className='flex flex-col space-y-4'>
          <button
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'
          >
            <IconBrandGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'
          >
            <IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'
          >
            <IconBrandOnlyfans className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
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
