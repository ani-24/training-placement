import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSidenav from "../../components/AdminSidenav";

const Index = () => {
  const router = useRouter();
  const isAdmin = Cookies.get("admin");

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    } else {
      setLoadPage(true);
    }
  }, [isAdmin]);

  return (
    <div>
      {loadPage && (
        <>
          <AdminSidenav />
        </>
      )}
    </div>
  );
};

export default Index;
