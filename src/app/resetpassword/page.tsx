"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Resetpassword() {
  const router = useRouter();
  const [userPassword, setUserPassword] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const onSubmitPassword = async () => {
    try {
      const res = await axios.post("/api/users/resetpassword", {
        password: userPassword,
        user,
      });
      if (res.data.success) {
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  const verifyToken = async () => {
    try {
      const res = await axios.post("/api/users/verifyforgotpassword", {
        token,
      });
      if (res?.data?.success) {
        console.log("Token verified", res?.data);
        setUser(res?.data?.user);
      } else {
        console.log("Token not verified", res?.data);
      }
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);
  useEffect(() => {
    verifyToken();
  }, [token]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{"Reset password"}</h1>
      <hr />
      <label htmlFor='email'>email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        type='text'
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        placeholder='enter new password'
      />
      <button
        onClick={onSubmitPassword}
        type='submit'
        className='p-2 border bg-red-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        Submit
      </button>
    </div>
  );
}
