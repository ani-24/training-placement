import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle, FaUsersCog, FaWrench } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const Sidenav = () => {
  return (
    <div className="sidenav">
      <ul>
        <Link href="/" className="sidenav-item">
          <AiFillHome />
          Home
        </Link>
        <Link href="/" className="sidenav-item">
          <RiDashboardFill />
          Dashboard
        </Link>
        <Link href="/" className="sidenav-item">
          <FaUsersCog />
          Manage Student
        </Link>
        <Link href="/" className="sidenav-item">
          <FaWrench />
          Manage Recruiter
        </Link>
        <Link href="/" className="sidenav-item">
          <BsPencilSquare />
          Placement Record
        </Link>
        <Link href="/" className="sidenav-item">
          <FaUserCircle />
          Profile
        </Link>
      </ul>
    </div>
  );
};

export default Sidenav;
