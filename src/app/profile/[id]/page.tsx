"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const router = useRouter();
  useEffect(() => {
    getUserQuestions();
  }, []);
  const search = useSearchParams();
  interface ResponseData {
    _id: string; // MongoDB ObjectId as a string
    question: string;
    user: string; // User ID as a string
    userAnswer: string[]; // Array of user answers
    __v: number; // Version key (optional)
  }

  const [response, setResponse] = useState<String>("");
  const [userQuestion, setUserQuestion] = useState<ResponseData>();
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);

  // this api get the questions and user  **no token required**

  const getUserQuestions = async () => {
    try {
      const res = await axios.post("/api/users/getUserQuestion", {
        id: search.get("id"),
      });
      if (res.data.success) {
        setUserQuestion(res?.data?.res);
      }
      console.log("getUserQuestions-------", res);
    } catch (error: any) {
      console.log("getUserQuestions Error", error?.message);
    }
  };

  const handleResponse = async () => {
    try {
      console.log("Response", response);
      const res = await axios.post("/api/users/updateResponse", {
        userAnswer: response,
        id: userQuestion?._id,
        userId: userQuestion?.user,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsSubmit(true);
        setTimeout(() => {
          router.push("/"); // redirect to profile page after submitting the response
        }, 4000);
        router;
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleResponse();
    } catch (err: any) {
      console.log(err?.message);
      toast.error("Error in submitting question");
    }
  };

  return (
    <div>
      <div className='h-auto w-auto bg-black p-5'>
        <Toaster />
        <div className='h-[40rem] flex flex-col justify-center  items-center px-4'>
          {userQuestion && (
            <h2 className='mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black'>
              {`${params.id} wants to know ${userQuestion?.question}`}
            </h2>
          )}
          {isSubmit ? (
            <div>
              <h2 className='mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black'>
                Your Response Submitted Successfully
              </h2>
              <h3 className='mb-10 sm:mb-20 text-sm text-center sm:text-5xl dark:text-white text-black'>
                Create your own Questions
              </h3>
              <h5 className='mb-10 sm:mb-20 text-sm text-center sm:text-5xl dark:text-white text-black'>
                Redirecting to profile page...
              </h5>
            </div>
          ) : (
            <PlaceholdersAndVanishInput
              placeholders={[
                "Enter your thoughts",
                "What do you think about this?",
                "What is your opinion?",
              ]}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
