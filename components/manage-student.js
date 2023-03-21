import React, { useEffect, useState } from "react";
import AdminSidenav from "./AdminSidenav";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const ManageStudent = () => {
  const [sid, setSid] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adding = toast.loading("Adding...");
    console.log(sid, email);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid, email }),
      });
      toast.success("Added", { id: adding });
      setSid("");
      setEmail("");
    } catch (error) {
      toast.error(`Error in adding the student`, { id: adding });
    }
  };
  return (
    <>
      <Toaster />
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white p-8 shadow-2xl rounded-lg w-[400px]">
          <form action="#" className="form" onSubmit={handleSubmit}>
            <div className="mb-5 input-field">
              <label htmlFor="username" className="label">
                Student's Id:
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
              />
            </div>
            <div className="mb-5 input-field">
              <label htmlFor="username" className="label">
                Student's Email:
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              Add student
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageStudent;
