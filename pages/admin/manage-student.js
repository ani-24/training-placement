import React, { useEffect, useState } from "react";
import AdminSidenav from "../../components/AdminSidenav";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const ManageStudent = () => {
  const [sid, setSid] = useState("");
  const [loadPage, setLoadPage] = useState(false);
  const router = useRouter();

  const isAdmin = Cookies.get("admin");

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    } else {
      setLoadPage(true);
    }
  }, [isAdmin]);

  const handleSubmit = async (e) => {
    console.log(sid);
    e.preventDefault();
    const adding = toast.loading("Adding...");
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sid }),
    });
    if (res.status === 201) {
      toast.success("Added", { id: adding });
      setSid("");
    } else {
      toast.error(`Error in adding the student`, { id: adding });
    }
  };
  return (
    <>
      <Toaster />
      {loadPage && (
        <div className="flex">
          <AdminSidenav />
          <div className="h-screen w-full flex justify-center items-center">
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
                <button type="submit" className="button">
                  Add student
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageStudent;
