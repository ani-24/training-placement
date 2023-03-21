import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle, FaUsersCog, FaWrench } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import Cookies from "js-cookie";

const Sidenav = () => {
  const logout = () => {
    Cookies.remove("admin");
  };
  return (
    <div className="sidenav">
      <ul>
        <Link href="/" className="sidenav-item">
          <AiFillHome />
          <span className="sidenav-text">Home</span>
        </Link>
        <Link href="/" className="sidenav-item">
          <RiDashboardFill />
          <span className="sidenav-text">Dashboard</span>
        </Link>
        <Link href="/admin?active=manage-student" className="sidenav-item">
          <FaUsersCog />
          <span className="sidenav-text">Manage Student</span>
        </Link>
        <Link href="/admin?active=manage-recruiter" className="sidenav-item">
          <FaWrench />
          <span className="sidenav-text">Manage Recruiter</span>
        </Link>
        <Link href="/" className="sidenav-item">
          <BsPencilSquare />
          <span className="sidenav-text">Placement Record</span>
        </Link>
        <Link href="/" className="sidenav-item">
          <FaUserCircle />
          <div className="sidenav-text">Profile</div>
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
