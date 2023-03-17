import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidenav from "../components/Sidenav";
import About from "../components/About";
import Student from "../models/student";
import mongoose from "mongoose";
import Education from "../components/Education";
import Internship from "../components/Internship";
import TechnicalSkills from "../components/TechnicalSkills";
import Resume from "../components/Resume";
import Password from "../components/Password";

const Profile = ({ student }) => {
  const router = useRouter();
  const { active } = router.query;
  useEffect(() => {
    if (!student) {
      router.push("/login");
    }
    if (!active) {
      router.push("/profile?active=about");
    }
  }, [router]);
  return (
    <div className="flex h-full w-full">
      <Sidenav active={active} />
      <div className="px-5 py-10 w-full h-screen overflow-auto">
        {active === "about" && <About student={student} />}
        {active === "education" && <Education student={student} />}
        {active === "internship" && <Internship student={student} />}
        {active === "technical-skills" && <TechnicalSkills student={student} />}
        {active === "resume" && <Resume student={student} />}
        {active === "password" && <Password student={student} />}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  const sid = context.req.cookies["student"];
  if (sid) {
    const student = await Student.findOne({ sid });
    return { props: { student: JSON.parse(JSON.stringify(student)) } };
  } else {
    return { props: { student: false } };
  }
}

export default Profile;
