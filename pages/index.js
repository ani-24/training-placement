import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import nProgress from "nprogress";

const Index = () => {
  const router = useRouter();

  Router.events.on("routeChangeStart", (url) => {
    nProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    nProgress.done();
  });
  Router.events.on("routeChangeError", (url) => {
    nProgress.done();
  });

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
