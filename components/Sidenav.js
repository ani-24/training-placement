import Link from "next/link";

import { HiAcademicCap } from "react-icons/hi";
import { BsInfoCircleFill, BsKeyFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { GiBrain } from "react-icons/gi";
import { AiFillHome, AiOutlineFileText, AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";

const Sidenav = ({ active }) => {
  const logout = () => {
    Cookies.remove("student");
  };
  return (
    <div className="sidenav">
      <ul>
        <Link href="/" className={`sidenav-item`}>
          <AiFillHome />
          Home
        </Link>
        <Link
          href="/profile?active=about"
          className={`sidenav-item ${active === "about" ? "active" : ""}`}
        >
          <BsInfoCircleFill />
          About
        </Link>
        <Link
          href="/profile?active=education"
          className={`sidenav-item ${active === "education" ? "active" : ""}`}
        >
          <HiAcademicCap />
          Education
        </Link>
        <Link
          href="/profile?active=internship"
          className={`sidenav-item ${active === "internship" ? "active" : ""}`}
        >
          <GrUserWorker />
          Internship & Work Experience
        </Link>
        <Link
          href="/profile?active=technical-skills"
          className={`sidenav-item ${
            active === "technical-skills" ? "active" : ""
          }`}
        >
          <GiBrain />
          Technical Skills
        </Link>
        <Link
          href="/profile?active=resume"
          className={`sidenav-item ${active === "resume" ? "active" : ""}`}
        >
          <AiOutlineFileText />
          My Resume
        </Link>
        <Link
          href="/profile?active=password"
          className={`sidenav-item ${active === "password" ? "active" : ""}`}
        >
          <BsKeyFill />
          Change Password
        </Link>
        <Link href="/" className={`sidenav-item`} onClick={logout}>
          <AiOutlineLogout />
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default Sidenav;
