"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("Login Page Mounted");
  }, []);

  const onForgotPassword = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email: user.email });
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor='email'>email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />

      <button
        onClick={onForgotPassword}
        type='submit'
        className='p-2 border bg-red-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {"Get Reset Link"}
      </button>
      <Link href='/signup'>Visit SignUp page</Link>
    </div>
  );
}
