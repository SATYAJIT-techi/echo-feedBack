"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("Logout response", res);
      router.push("/login");
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
    </div>
  );
}
