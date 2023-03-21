import Cookies from "js-cookie";
import Link from "next/link";

const Navbar = () => {
  const logout = () => {
    Cookies.remove("student");
  };
  return (
    <div className="flex justify-around items-center text-black border-b">
      <Link href="/student" className="font-bold text-lg">
        TP
      </Link>
      <ul className="flex">
        <li className="nav-li">
          <Link href="#">Dashboard</Link>
        </li>
        <li className="nav-li">
          <Link href="/JobProfile">Job Profile</Link>
        </li>
        <li className="nav-li group">
          <Link href="#">Interview</Link>
          <ul className="dropdown">
            <li className="dropdown-item">
              <Link href="#">Interview 1</Link>
            </li>
            <li className="dropdown-item">
              <Link href="#">Interview 2</Link>
            </li>
          </ul>
        </li>
        <li className="nav-li group">
          <Link href="#">Profile</Link>
          <ul className="dropdown">
            <li className="dropdown-item">
              <Link href="/profile">My Profile</Link>
            </li>
            <li className="dropdown-item mb-0">
              <Link href="" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
