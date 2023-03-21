import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSidenav from "../../components/AdminSidenav";
import ManageStudent from "../../components/manage-student";
import ManageRecruiter from "../../components/ManageRecruiter";

const Index = () => {
  const router = useRouter();
  const isAdmin = Cookies.get("admin");

  const { active } = router.query;

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    } else {
      router.push("/admin?active=home");
    }
  }, [isAdmin]);
  console.log(active);
  return (
    <div className="flex h-full w-full">
      <AdminSidenav active={active} />
      <div className="px-5 py-10 w-full h-screen overflow-auto">
        {active === "manage-student" && <ManageStudent />}
        {active === "manage-recruiter" && <ManageRecruiter />}
      </div>
    </div>
  );
};

export default Index;
