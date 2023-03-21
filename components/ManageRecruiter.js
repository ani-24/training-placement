import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import emailjs from "emailjs-com";

const ManageRecruiter = () => {
  const [data, setData] = useState({
    name: "",
    role: "",
    classXmarks: "",
    classXIImarks: "",
    cgpa: "",
    form: "",
    about: "",
    jobLocation: "",
    deadline: "",
  });

  const handleSubmit = async (e) => {
    const newToast = toast.loading("Adding company...");
    try {
      e.preventDefault();
      const res = await fetch("/api/addCompany", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      toast.success(res.message, { id: newToast });
      setData({
        name: "",
        role: "",
        classXmarks: "",
        classXIImarks: "",
        cgpa: "",
        form: "",
        about: "",
        jobLocation: "",
        deadline: "",
      });
    } catch (error) {
      toast.error(error, { id: newToast });
      setData({
        name: "",
        role: "",
        classXmarks: "",
        classXIImarks: "",
        cgpa: "",
        form: "",
        about: "",
        jobLocation: "",
        deadline: "",
      });
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Toaster />
      <form
        className="p-10 bg-white shadow-lg w-[800px]"
        onSubmit={handleSubmit}
      >
        <p className="mb-10 text-xl font-bold uppercase">Add new copmany:</p>
        <div className="grid grid-cols-2 gap-10">
          <div className="input-field">
            <label htmlFor="name" className="label">
              * Company Name:
            </label>
            <input
              name=""
              id="name"
              className="input"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="role" className="label">
              * Hiring for:
            </label>
            <select
              name=""
              id="role"
              className="input"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value="" disabled>
                Choose role
              </option>
              <option value="Associate Software Engineer">
                Associate Software Engineer
              </option>
              <option value="Application Engineer">Application Engineer</option>
              <option value="System Engineer">System Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="DevOps Developer">DevOps Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Graduate Engineer Trainee">
                Graduate Engineer Trainee
              </option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Business Analyst">Business Analyst</option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="classX" className="label">
              marks required in Class X:
            </label>
            <input
              type="number"
              className="input"
              id="classX"
              value={data.classXmarks}
              onChange={(e) =>
                setData({ ...data, classXmarks: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="classX" className="label">
              marks required in Class XII:
            </label>
            <input
              type="number"
              className="input"
              id="classX"
              value={data.classXIImarks}
              onChange={(e) =>
                setData({ ...data, classXIImarks: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="graduation" className="label">
              cgpa required in graduation:
            </label>
            <input
              type="number"
              step="any"
              className="input"
              id="graduation"
              value={data.cgpa}
              onChange={(e) => setData({ ...data, cgpa: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="form" className="label">
              * Google form link:
            </label>
            <input
              type="text"
              className="input"
              id="form"
              value={data.form}
              onChange={(e) => setData({ ...data, form: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="form" className="label">
              * Job Location:
            </label>
            <input
              type="text"
              className="input"
              id="form"
              value={data.jobLocation}
              onChange={(e) =>
                setData({ ...data, jobLocation: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="form" className="label">
              * Last date of submission of form:
            </label>
            <input
              type="date"
              className="input"
              id="form"
              value={data.deadline}
              onChange={(e) => setData({ ...data, deadline: e.target.value })}
            />
          </div>
          <div className="input-field col-span-2">
            <label htmlFor="about" className="label">
              * About the company:
            </label>
            <textarea
              name=""
              id="about"
              rows="10"
              className="input"
              value={data.about}
              onChange={(e) =>
                setData({ ...data, about: e.target.value.replace("\\n", "\n") })
              }
            ></textarea>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" className="button">
            <AiOutlinePlusCircle /> Add company
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageRecruiter;
