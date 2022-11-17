import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const [active, setActive] = useState("student");
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
          <form action="#" className="form">
            <div className="mb-5">
              <label htmlFor="username" className="label">
                Username:
              </label>
              <input type="text" id="username" className="input" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <input type="password" id="password" className="input" />
            </div>
            <Link
              href={`${active === "student" ? "/student" : "/admin"}`}
              className="button"
            >
              Login
            </Link>
          </form>
          <a
            href="#"
            className={`${
              active === "admin" ? "hidden" : "block"
            } underline mt-5`}
          >
            Not a user? Registere here
          </a>
        </div>
      </div>
    </div>
  );
}
