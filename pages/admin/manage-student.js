import React, { useEffect, useState } from "react";
import Sidenav from "../../components/Sidenav";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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
    const res = await axios.post("/api/students", { sid });
    if (res) {
      setSid("");
    } else {
      if (res.status === 500) {
        console.log(res.data);
      }
    }
  };
  return (
    <>
      {loadPage && (
        <div className="flex">
          <Sidenav />
          <div className="h-screen w-full flex justify-center items-center">
            <div className="bg-white p-8 shadow-2xl rounded-lg">
              <form action="#" className="form" onSubmit={handleSubmit}>
                <div className="mb-5">
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
