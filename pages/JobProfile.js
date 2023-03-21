import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const jobProfile = () => {
  const router = useRouter();
  const auth = Cookies.get("student");

  const [companies, setCompanies] = useState();

  const [student, setStudent] = useState();

  const listCompanies = async () => {
    const newToast = toast.loading("Fetching job profiles for you...");
    try {
      const res = await fetch("/api/listCompanies", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid: auth }),
      })
        .then((r) => r.json())
        .then((data) => setCompanies(data.companies));
      toast.success("Done", { id: newToast });
    } catch (error) {
      toast.success(error, { id: newToast });
    }
  };

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    } else {
      setStudent(auth);
      listCompanies();
    }
  }, [auth]);
  return (
    <>
      <Toaster />
      <Navbar />
      <main className="bg-[#f7f7f7] p-10 flex justify-center items-center">
        {companies?.length > 0 ? (
          <div className="container w-2/3">
            {companies?.map((el) => {
              return (
                <div
                  className="bg-white p-10 shadow-lg w-full rounded-lg mb-12"
                  key={el._id}
                >
                  <h1 className="font-semibold text-2xl mb-10">{el.name}</h1>
                  <p className="mb-10">
                    <b>Job Role:</b> {el.role}
                  </p>
                  <p className="mb-10">{el.about}</p>
                  <div className="mb-10">
                    <b className="block mb-5">Requirements:</b>
                    <ul className="list-disc list-inside italic px-5">
                      <li>
                        {el.classXmarks
                          ? `${el.classXmarks}% in class Xth.`
                          : ""}
                      </li>
                      <li>
                        {el.classXIImarks
                          ? `${el.classXIImarks}% in class XIIth.`
                          : ""}
                      </li>
                      <li>{el.cgpa ? `${el.cgpa} cgpa in Graduation.` : ""}</li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <b>Job Location:</b> <span>{el.jobLocation}</span>
                  </div>
                  <div className="mb-10">
                    <b>Last date to apply:</b> <span>{el.deadline}</span>
                  </div>
                  <a
                    href={el.form}
                    className="button button--secondary inline"
                    target={"_blank"}
                  >
                    Apply now
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <div className="text-center max-w-xl">
              <p className="text-5xl mb-5">¯\_(ツ)_/¯</p>
              <h3 className="text-xl font-semibold">No companies listed</h3>
              <p className="my-5">
                There are no companies that match your profile. We will list new
                companies once they match your profile.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default jobProfile;
