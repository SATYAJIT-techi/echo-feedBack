"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Modal, ModalTrigger } from "@/components/ui/animated-modal";
import toast, { Toaster } from "react-hot-toast";

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
      if (res.data.success) {
        toast.success(res.data.message);
        setUserLink(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      console.log(" handlePusblishQuestion Error", error?.message);
    }
  };
  const placeholders = [
    "How was the Deadpool Movie?",
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
    try {
      handlePusblishQuestion();
    } catch (err: any) {
      console.log(err?.message);
      toast.error("Error in submitting question");
    }
  };
  return (
    <div className='h-auto w-auto bg-black p-5'>
      <Toaster />
      <div className='h-[40rem] flex flex-col justify-center  items-center px-4'>
        <h2 className='mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black'>
          Ask Public Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        {userLink && (
          <Modal>
            <ModalTrigger className='bg-black mt-4 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn'>
              <span className='group-hover/modal-btn:translate-x-60 text-center transition duration-500 '>
                {userLink}
              </span>
              <div
                onClick={() => {
                  toast.success("Share Link Copied");
                  navigator.clipboard.writeText(userLink);
                }}
                className='-translate-x-60 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20'
              >
                ✈️
              </div>
            </ModalTrigger>
          </Modal>
        )}
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
      {/* <div className='relative bottom-0 left-0 flex'>
        <button
          onClick={onLogout}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          Logout
        </button>
      </div> */}
    </div>
  );
}
