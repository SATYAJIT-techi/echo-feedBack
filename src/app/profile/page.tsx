"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState("no user");
  const [question, setQuestion] = useState("");
  const [userLink, setUserLink] = useState("");

  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("Logout response", res);
      router.push("/login");
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  // const getUserDetails = async () => {
  //   try {
  //     const res = await axios.get("/api/users/verifyMe");
  //     console.log("User details", res?.data);
  //     setUser(res?.data);
  //   } catch (error: any) {
  //     console.log("Error", error?.message);
  //   }
  // };

  const handlePusblishQuestion = async () => {
    try {
      const res = await axios.post("/api/users/questions", {
        userQuestion: question,
      });
      setUserLink(res.data.data);
    } catch (error: any) {
      console.log(" handlePusblishQuestion Error", error?.message);
    }
  };
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePusblishQuestion();
  };
  return (
    <div className='h-auto w-auto bg-black p-5'>
      <div className='h-[40rem] flex flex-col justify-center  items-center px-4'>
        <h2 className='mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black'>
          Ask Aceternity UI Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <div>{userLink && <h2>{userLink}</h2>}</div>
        <div className='flex flex-col space-y-5'>
          <button
            onClick={onLogout}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          >
            Logout
          </button>
          <div>{userLink && <h2>{userLink}</h2>}</div>
          {user !== "no user" && (
            <Link href={`/profile/${user}`}>
              <div className='p-1 bg-red-600'>
                <h2>User ID</h2>
                <p>{user}</p>
              </div>
            </Link>
          )}
          {/* <button
            onClick={getUserDetails}
            className='p-2 border bg-blue-400 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          >
            Get User Details
          </button> */}
        </div>
      </div>
      {/* <h1>Profile</h1>
      <hr />
      <div>
        <h2>Username</h2>
        <p>John Doe</p>
      </div>
      <div>{userLink && <h2>{userLink}</h2>}</div>
      <div className='flex flex-col space-y-5'>
        <button
          onClick={onLogout}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          Logout
        </button>
        {user !== "no user" && (
          <Link href={`/profile/${user}`}>
            <div className='p-1 bg-red-600'>
              <h2>User ID</h2>
              <p>{user}</p>
            </div>
          </Link>
        )}
        <button
          onClick={getUserDetails}
          className='p-2 border bg-blue-400 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          Get User Details
        </button>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          placeholder='Enter your Question'
        />
        <button
          onClick={handlePusblishQuestion}
          className='p-2 border bg-blue-400 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          Ask Question
        </button>
      </div> */}
    </div>
  );
}
