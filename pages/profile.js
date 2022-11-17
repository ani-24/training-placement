import Link from "next/link";

import { HiAcademicCap } from "react-icons/hi";
import { BsInfoCircleFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { GiBrain } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";

const Profile = () => {
  return (
    <div>
      <div className="sidenav">
        <ul>
          <Link href="/" className="sidenav-item">
            <BsInfoCircleFill />
            About
          </Link>
          <Link href="/" className="sidenav-item">
            <HiAcademicCap />
            Education
          </Link>
          <Link href="/" className="sidenav-item">
            <GrUserWorker />
            Internship & Work Experience
          </Link>
          <Link href="/" className="sidenav-item">
            <GiBrain />
            Technical Skills
          </Link>
          <Link href="/" className="sidenav-item">
            <AiOutlineFileText />
            My Resume
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
