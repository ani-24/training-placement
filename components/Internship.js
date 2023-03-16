import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Modal from "./Modal";
import Overlay from "./Overlay";

const ModalBox = ({ internship, student }) => {
  const [data, setData] = useState(
    internship
      ? internship
      : {
          companyName: "",
          companySector: "",
          jobTitle: "",
          jobLocation: "",
          positionType: "",
          jobFunction: "",
          startDate: "",
          endDate: "",
          salary: "",
          isWorking: false,
          jobDescription: "",
        }
  );

  const update = async (e) => {
    const updating = toast.loading("Updating...");
    e.preventDefault();
    const res = await fetch("/api/updateInternship", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        companyName: data.companyName,
        companySector: data.companySector,
        jobTitle: data.jobTitle,
        jobLocation: data.jobLocation,
        positionType: data.positionType,
        jobFunction: data.jobFunction,
        startDate: data.startDate,
        endDate: data.endDate,
        salary: data.salary,
        isWorking: data.isWorking,
        jobDescription: data.jobDescription,
        _id: internship._id,
      }),
    });
    if (res.status === 201) {
      toast.success("Updated", { id: updating });
      window.location.reload();
    } else {
      toast.error(`Error: ${res.data}`, { id: updating });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adding = toast.loading("Saving...");
    const res = await fetch("/api/addInternship", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        companyName: data.companyName,
        companySector: data.companySector,
        jobTitle: data.jobTitle,
        jobLocation: data.jobLocation,
        positionType: data.positionType,
        jobFunction: data.jobFunction,
        startDate: data.startDate,
        endDate: data.endDate,
        salary: data.salary,
        isWorking: data.isWorking,
        jobDescription: data.jobDescription,
      }),
    });
    if (res.status === 201) {
      toast.success("Saved", { id: adding });
      window.location.reload();
    } else {
      toast.error(`Error: ${res.data}`, { id: adding });
    }
  };

  return (
    <>
      <Modal>
        <div className="border-b flex justify-center items-center py-5">
          Add new Experience
        </div>
        <form onSubmit={data._id ? update : handleSubmit}>
          <div className="p-10 grid grid-cols-2 gap-x-10 gap-y-8">
            {" "}
            <div className="input-field">
              <label htmlFor="companyName" className="label">
                Company Name:
              </label>
              <input
                type="text"
                className="input"
                id="companyName"
                defaultValue={data.companyName}
                onChange={(e) => {
                  setData({ ...data, companyName: e.target.value });
                }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="companySector" className="label">
                Company Sector:
              </label>
              <input
                type="text"
                className="input"
                id="companySector"
                defaultValue={data.companySector}
                onChange={(e) =>
                  setData({ ...data, companySector: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="jobTitle" className="label">
                Job Title:
              </label>
              <input
                type="text"
                className="input"
                id="jobTitle"
                defaultValue={data.jobTitle}
                onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
              />
            </div>
            <div className="input-field">
              <label htmlFor="jobLocation" className="label">
                Job Location:
              </label>
              <input
                type="text"
                className="input"
                id="jobLocation"
                defaultValue={data.jobLocation}
                onChange={(e) =>
                  setData({ ...data, jobLocation: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="positionType" className="label">
                Position Type:
              </label>
              <select
                name=""
                id="positionType"
                className="input"
                defaultValue={data.positionType}
                onChange={(e) =>
                  setData({ ...data, positionType: e.target.value })
                }
              >
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
                <option value="Volunteering Experience">
                  Volunteering Experience
                </option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="jobFunction" className="label">
                Job Function:
              </label>
              <input
                type="text"
                id="jobFunction"
                className="input"
                defaultValue={data.jobFunction}
                onChange={(e) =>
                  setData({ ...data, jobFunction: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="startDate" className="label">
                Start Date:
              </label>
              <input
                type="date"
                className="input"
                id="startDate"
                defaultValue={data.startDate}
                onChange={(e) =>
                  setData({ ...data, startDate: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="endDate" className="label">
                End Date:
              </label>
              <input
                type="date"
                className="input"
                id="endDate"
                defaultValue={data.endDate}
                onChange={(e) => setData({ ...data, endDate: e.target.value })}
              />
            </div>
            <div className="input-field">
              <label htmlFor="endDate" className="label">
                Salary / Stipend Range:
              </label>
              <select
                name=""
                id="endDate"
                className="input"
                defaultValue={data.salary}
                onChange={(e) => setData({ ...data, salary: e.target.value })}
              >
                <option value="No Salary / Stipend">No Salary / Stipend</option>
                <option value="₹0 - ₹5,000">₹0 - ₹5,000</option>
                <option value="₹5,000 - ₹10,1000">₹5,000 - ₹10,1000</option>
                <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                <option value="₹25,000 - 50,000">₹25,000 - 50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                <option value="Do not wish to specify">
                  Do not wish to specify
                </option>
              </select>
            </div>
            <div className="input-field flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="isWorking"
                defaultValue={data.isWorking}
                onChange={(e) => {
                  setData({
                    ...data,
                    isWorking: e.target.checked ? true : false,
                  });
                }}
              />
              <label htmlFor="isWorking">I currently work here</label>
            </div>
            <div className="input-field col-span-2">
              <label htmlFor="jobDescription" className="label">
                Job Description:
              </label>
              <textarea
                name=""
                id="jobDescription"
                cols="10"
                rows="5"
                className="input resize-none grid"
                defaultValue={data.jobDescription}
                onChange={(e) =>
                  setData({ ...data, jobDescription: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="pb-5 flex justify-center items-center">
            <button type="submit" className="flex items-center button">
              <BsFillCheckCircleFill />
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const Internship = ({ student }) => {
  const [internship, setInternship] = useState(student.internship);
  const [modal, setModal] = useState(false);

  const [index, setIndex] = useState(null);

  return (
    <>
      <Toaster />
      {modal && (
        <div onClick={() => setModal(false)}>
          <Overlay />
        </div>
      )}
      {modal ? (
        index != null ? (
          <ModalBox internship={student.internship[index]} student={student} />
        ) : (
          <ModalBox student={student} />
        )
      ) : (
        ""
      )}
      <div className="h-full w-full">
        {internship.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <div className="text-center max-w-xl">
              <p className="text-5xl mb-5">¯\_(ツ)_/¯</p>
              <h3 className="text-xl font-semibold">
                No Internship & Work Ex added yet
              </h3>
              <p className="my-5">
                You have not added any internship & work experience yet. Please
                click here to add internship & work experience.
              </p>
              <button
                className="inline-flex items-center button"
                onClick={() => setModal(true)}
              >
                <AiOutlinePlus /> Add new
              </button>
            </div>
          </div>
        ) : (
          <div className="pb-10">
            {internship.map((el, idx) => (
              <div key={el._id}>
                <div className="border-b p-10">
                  <div className="flex justify-between items-center">
                    <div className="mb-5 border-b pb-2 border-black border-opacity-60">
                      <p className="text-xl font-bold uppercase mb-1">
                        {el.companyName}
                      </p>
                      {el.startDate ? (
                        el.endDate ? (
                          <small>
                            {`${new Date(el.startDate).toLocaleString("en-us", {
                              month: "long",
                            })} ${new Date(el.startDate).getFullYear()}`}{" "}
                            -{" "}
                            {`${new Date(el.endDate).toLocaleString("en-us", {
                              month: "long",
                            })} ${new Date(el.endDate).getFullYear()}`}
                          </small>
                        ) : (
                          <small className="italic">Currently Working</small>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setModal(true);
                        setIndex(idx);
                      }}
                      className="button button--secondary"
                    >
                      <FaPencilAlt /> Update
                    </button>
                  </div>
                  <ul className="flex flex-col gap-5">
                    <li>
                      <span>Company Name:</span> <span>{el.companyName}</span>
                    </li>
                    <li>
                      <span>Company Sector:</span>{" "}
                      <span>{el.companySector}</span>
                    </li>
                    <li>
                      <span>Job Title:</span> <span>{el.jobTitle}</span>
                    </li>
                    <li>
                      <span>Job Location:</span> <span>{el.jobLocation}</span>
                    </li>
                    <li>
                      <span>Position Type:</span> <span>{el.positionType}</span>
                    </li>
                    <li>
                      <span>Job Function:</span> <span>{el.jobFunction}</span>
                    </li>
                    <li>
                      <span>Start Date:</span> <span>{el.startDate}</span>
                    </li>
                    <li>
                      <span>End Date:</span>{" "}
                      <span>{el.endDate ? el.endDate : "NA"}</span>
                    </li>
                    <li>
                      <span>Salary / Stipend Range:</span>{" "}
                      <span>{el.salary}</span>
                    </li>
                    <li>
                      <span className="mb-2 inline-block font-bold">
                        Job Description:
                      </span>{" "}
                      <br />
                      <span className="inline-block ml-3">
                        {el.jobDescription}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center mt-5 w-full">
              <button
                className="inline-flex items-center button"
                onClick={() => {
                  setModal(true);
                  setIndex(null);
                }}
              >
                <AiOutlinePlus /> Add new
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Internship;
