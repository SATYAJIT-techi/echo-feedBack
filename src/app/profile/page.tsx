"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/verifyMe");
      console.log("User details", res);
      setUser(res?.data?._id);
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

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
  console.log(`${process.env.DOMAIN}`);
  return (
    <div>
      <h1>Profile</h1>
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
      </div>
    </div>
  );
}
