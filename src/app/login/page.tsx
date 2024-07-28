"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("Login Page Mounted");
  }, []);

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log("Login response", res);
      if (res?.data?.success) {
        console.log("Login successful");
        router.push("/profile");
      }
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
      <label htmlFor='password'>password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        onClick={onLogin}
        type='submit'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href='/signup'>Visit SignUp page</Link>
    </div>
  );
}
