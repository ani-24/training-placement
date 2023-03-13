import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
// import axios from "axios";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

export default function Home() {
  const [active, setActive] = useState("student");
  const [sid, setSid] = useState("");
  const [spass, setSpass] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminpass, setAdminpass] = useState("");

  const [sidError, setSidError] = useState(false);
  const [spassError, setSpassError] = useState(false);

  const [serverError, setServerError] = useState(false);

  const router = useRouter();

  const auth = Cookies.get("student");
  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth]);

  const handleStudent = async (e) => {
    e.preventDefault();
    if (sid.trim() !== "" && spass.trim() !== "") {
      setSidError(false);
      setSpassError(false);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid, password: spass }),
      });
      if (res.status === 200) {
        const maxAge = 3 * 60 * 60;
        Cookies.set("student", sid, { expires: maxAge });
        const isAdmin = Cookies.get("admin");
        if (isAdmin) {
          Cookies.remove("admin");
        }
        router.push("/");
      } else {
        setServerError(true);
      }
    } else {
      if (sid.trim() === "") {
        setSidError(true);
        if (spass.trim() === "") {
          setSpassError(true);
        } else {
          setSpassError(false);
        }
      } else {
        setSidError(false);
      }
    }
  };
  const handleAdmin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: adminUsername, password: adminpass }),
    });
    if (res.status === 200) {
      Cookies.set("admin", true);
      const student = Cookies.get("student");
      if (student) {
        Cookies.remove("student");
      }
      router.push("/admin");
    } else {
      setServerError(true);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[400px] shadow-2xl rounded-2xl overflow-hidden max-w-[80%]">
        <div className="flex w-full">
          <div
            className={`flex justify-center items-center flex-col py-4 flex-1 cursor-pointer ${
              active === "student"
                ? "bg-black text-white"
                : "bg-gray-100 border-b border-black border-opacity-20"
            }`}
            onClick={(prev) => setActive("student")}
          >
            <span className="form__container__top__box__icon">
              <FaUsers />
            </span>
            <span className="form__container__top__box__text">Student</span>
          </div>
          <div
            className={`flex justify-center items-center flex-col py-4 flex-1 cursor-pointer ${
              active === "admin"
                ? "bg-black text-white"
                : "bg-gray-100 border-b border-black border-opacity-20"
            }`}
            onClick={(prev) => setActive("admin")}
          >
            <span className="form__container__top__box__icon">
              <MdAdminPanelSettings />
            </span>
            <span className="form__container__top__box__text">Admin</span>
          </div>
        </div>
        <div className="p-8">
          {serverError && (
            <span className="text-red-500 italic font-semibold mb-10 block">
              *Invalid credentials
            </span>
          )}
          {active !== "admin" ? (
            <>
              <form action="#" className="form" onSubmit={handleStudent}>
                <div className="input-field mb-10">
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
                  {sidError && (
                    <small className="text-red-500 italic font-semibold">
                      *Invalid Credential
                    </small>
                  )}
                </div>
                <div className="input-field mb-10">
                  <label htmlFor="password" className="label">
                    Student's Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input"
                    value={spass}
                    onChange={(e) => setSpass(e.target.value)}
                  />
                  {spassError && (
                    <small className="text-red-500 italic font-semibold">
                      *Invalid Credential
                    </small>
                  )}
                </div>
                <button type="submit" className="button">
                  Login as student
                </button>
              </form>
            </>
          ) : (
            <form action="#" className="form" onSubmit={handleAdmin}>
              <div className="mb-10 input-field">
                <label htmlFor="username" className="label">
                  Admin Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>
              <div className="mb-10 input-field">
                <label htmlFor="password" className="label">
                  Admin Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  value={adminpass}
                  onChange={(e) => setAdminpass(e.target.value)}
                />
              </div>
              <button type="submit" className="button">
                Login as admin
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
