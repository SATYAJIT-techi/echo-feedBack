"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState("no user");

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
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <div>
        <h2>Username</h2>
        <p>John Doe</p>
      </div>
      <div>
        <h2>Email</h2>
      </div>
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
    </div>
  );
}
