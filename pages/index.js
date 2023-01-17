import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();
  const [student, setStudent] = useState(null);

  const [loadPage, setLoadPage] = useState(false);

  const auth = Cookies.get("student");
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    } else {
      setStudent(auth);
      setLoadPage(true);
    }
  }, [auth]);

  return (
    <div>
      {loadPage && (
        <>
          <Navbar />
        </>
      )}
    </div>
  );
};

export default Index;
