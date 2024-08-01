"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function UserProfile({ params }: any) {
  useEffect(() => {
    getUserQuestions();
  }, []);

  const [response, setResponse] = useState("");

  // this api get the questions and user  **no token required**

  const getUserQuestions = async () => {
    try {
      const res = await axios.get("/api/users/questions");
      console.log("getUserQuestions", res);
    } catch (error: any) {
      console.log("getUserQuestions Error", error?.message);
    }
  };

  const handleResponse = async () => {
    try {
      const res = await axios.post("/api/users/updateResponse", {
        userAnswer: response,
      });
      console.log("Response", res);
    } catch (error: any) {
      console.log("handleResponse Error", error?.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <div>
        <h2>Username</h2>
        <h2>{params.id}</h2>
      </div>
      <input
        type='text'
        placeholder='Enter your question'
        onChange={(e) => setResponse(e.target.value)}
        value={response}
        className='text-black'
      />
      <button onClick={handleResponse}>Submit</button>
    </div>
  );
}
