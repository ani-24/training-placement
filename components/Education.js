import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiPlusCircle } from "react-icons/bi";
import { BsFillCheckCircleFill, BsPencilSquare } from "react-icons/bs";
import Modal from "./Modal";
import Overlay from "./Overlay";

const CurrentCourse = ({ student }) => {
  const [data, setData] = useState(
    student.currentEducation
      ? student.currentEducation
      : {
          program: "",
          branch: "",
          semester: "",
          rollNo: "",
          startDate: "",
          endDate: "",
          score: "",
        }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saving = toast.loading("Saving...");
    const res = await fetch("/api/updateCurrentEducation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        ...data,
      }),
    });
    if (res.status === 201) {
      toast.success("Saved", { id: saving });
      window.location.reload();
    } else {
      toast.error("Error", { id: saving });
    }
  };

  return (
    <>
      <Modal>
        <div className="border-b flex justify-center items-center py-5">
          Current / Most Recent Course
        </div>
        <div className="p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10">
              <div className="input-field">
                <label htmlFor="program" className="label">
                  Program
                </label>
                <input
                  type="text"
                  className="input"
                  id="program"
                  defaultValue={data.program}
                  onChange={(e) =>
                    setData({ ...data, program: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="program" className="label">
                  Major / Branch
                </label>
                <input
                  type="text"
                  className="input"
                  id="program"
                  defaultValue={data.branch}
                  onChange={(e) => setData({ ...data, brach: e.target.value })}
                />
              </div>
              <div className="input-field">
                <label htmlFor="program" className="label">
                  Current Semester
                </label>
                <select
                  id="semester"
                  className="input"
                  defaultValue={data.semester}
                  onChange={(e) =>
                    setData({ ...data, semester: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Choose semester
                  </option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                  <option value="Semester 9">Semester 9</option>
                  <option value="Semester 10">Semester 10</option>
                </select>
              </div>
              <div className="input-field">
                <label htmlFor="rollNo" className="label">
                  Institute Roll no.
                </label>
                <input
                  type="text"
                  className="input"
                  id="rollNo"
                  defaultValue={data.rollNo}
                  onChange={(e) => setData({ ...data, rollNo: e.target.value })}
                />
              </div>
              <div className="input-field">
                <label htmlFor="startDate" className="label">
                  Course start date:
                </label>
                <input
                  type="month"
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
                  Course end date:
                </label>
                <input
                  type="month"
                  className="input"
                  id="endDate"
                  defaultValue={data.endDate}
                  onChange={(e) =>
                    setData({ ...data, endDate: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="score" className="label">
                  Percentage Equivalent:
                </label>
                <input
                  type="number"
                  className="input"
                  id="score"
                  defaultValue={data.score}
                  onChange={(e) => setData({ ...data, score: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button type="submit" className="button">
                <BsFillCheckCircleFill /> Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
const ClassX = ({ student }) => {
  const [data, setData] = useState(
    student.classXEducation
      ? student.classXEducation
      : {
          schoolName: "",
          board: "",
          endYear: "",
          score: "",
        }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saving = toast.loading("Saving...");
    const res = await fetch("/api/updateClassX", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        ...data,
      }),
    });
    if (res.status === 201) {
      toast.success("Saved", { id: saving });
      window.location.reload();
    } else {
      toast.error("Error", { id: saving });
    }
  };

  return (
    <>
      <Modal>
        <div className="border-b flex justify-center items-center py-5">
          Class Xth
        </div>
        <div className="p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10">
              <div className="input-field">
                <label htmlFor="schoolName" className="label">
                  School Name:
                </label>
                <input
                  type="text"
                  className="input"
                  id="schoolName"
                  defaultValue={data.schoolName}
                  onChange={(e) =>
                    setData({ ...data, schoolName: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="board" className="label">
                  Board:
                </label>
                <input
                  type="text"
                  className="input"
                  id="board"
                  defaultValue={data.board}
                  onChange={(e) => setData({ ...data, board: e.target.value })}
                />
              </div>
              <div className="input-field">
                <label htmlFor="endYear" className="label">
                  End Year
                </label>
                <input
                  type="month"
                  className="input"
                  id="endYear"
                  min={1900}
                  max={new Date().getFullYear()}
                  defaultValue={data.endYear}
                  onChange={(e) =>
                    setData({ ...data, endYear: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="score" className="label">
                  Score in percentage:
                </label>
                <input
                  type="number"
                  className="input"
                  id="score"
                  defaultValue={data.score}
                  onChange={(e) => setData({ ...data, score: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button type="submit" className="button">
                <BsFillCheckCircleFill /> Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
const ClassXII = ({ student }) => {
  const [data, setData] = useState(
    student.classXIIEducation
      ? student.classXIIEducation
      : {
          schoolName: "",
          board: "",
          stream: "",
          endYear: "",
          score: "",
        }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saving = toast.loading("Saving...");
    const res = await fetch("/api/updateClassXII", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        ...data,
      }),
    });
    if (res.status === 201) {
      toast.success("Saved", { id: saving });
      window.location.reload();
    } else {
      toast.error("Error", { id: saving });
    }
  };

  return (
    <>
      <Modal>
        <div className="border-b flex justify-center items-center py-5">
          Class XIIth
        </div>
        <div className="p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10">
              <div className="input-field">
                <label htmlFor="schoolName" className="label">
                  School Name:
                </label>
                <input
                  type="text"
                  className="input"
                  id="schoolName"
                  defaultValue={data.schoolName}
                  onChange={(e) =>
                    setData({ ...data, schoolName: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="board" className="label">
                  Board:
                </label>
                <input
                  type="text"
                  className="input"
                  id="board"
                  defaultValue={data.board}
                  onChange={(e) => setData({ ...data, board: e.target.value })}
                />
              </div>
              <div className="input-field">
                <label htmlFor="stream" className="label">
                  Stream:
                </label>
                <input
                  type="text"
                  className="input"
                  id="stream"
                  defaultValue={data.stream}
                  onChange={(e) => setData({ ...data, stream: e.target.value })}
                />
              </div>
              <div className="input-field">
                <label htmlFor="endYear" className="label">
                  End Year
                </label>
                <input
                  type="month"
                  className="input"
                  id="endYear"
                  min={1900}
                  max={new Date().getFullYear()}
                  defaultValue={data.endYear}
                  onChange={(e) =>
                    setData({ ...data, endYear: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="score" className="label">
                  Score in percentage:
                </label>
                <input
                  type="number"
                  className="input"
                  id="score"
                  defaultValue={data.score}
                  onChange={(e) => setData({ ...data, score: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button type="submit" className="button">
                <BsFillCheckCircleFill /> Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

const Education = ({ student }) => {
  const [currentCourse, setCurrentCourse] = useState(false);
  const [classX, setClassX] = useState(false);
  const [classXII, setClassXII] = useState(false);
  return (
    <>
      <Toaster />
      {currentCourse || classX || classXII ? (
        <div
          onClick={() => {
            setCurrentCourse(false);
            setClassX(false);
            setClassXII(false);
          }}
        >
          <Overlay />
        </div>
      ) : (
        ""
      )}
      {currentCourse && <CurrentCourse student={student} />}
      {classX && <ClassX student={student} />}
      {classXII && <ClassXII student={student} />}
      <div className="h-full w-full">
        <div className="mb-10 p-10 border-b">
          <div className="flex justify-between items-center">
            <div className="mb-5 border-b pb-2 border-black border-opacity-60">
              <h1 className="text-xl font-bold mb-2">
                Current / Most Recent course:
              </h1>
              {student.currentEducation?.startDate ? (
                student.currentEducation?.endDate ? (
                  <small>
                    {`${new Date(
                      student.currentEducation?.startDate
                    ).toLocaleString("en-us", {
                      month: "long",
                    })} ${new Date(
                      student.currentEducation?.startDate
                    ).getFullYear()}`}{" "}
                    -{" "}
                    {`${new Date(
                      student.currentEducation?.endDate
                    ).toLocaleString("en-us", {
                      month: "long",
                    })} ${new Date(
                      student.currentEducation?.endDate
                    ).getFullYear()}`}
                  </small>
                ) : (
                  <small className="italic">Currently Working</small>
                )
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => setCurrentCourse(true)}
              className="button button--secondary"
            >
              {!student.currentEducation ? (
                <>
                  <BiPlusCircle /> Add new
                </>
              ) : (
                <>
                  <BsPencilSquare /> Update
                </>
              )}
            </button>
          </div>
          {student.currentEducation && (
            <div className="flex flex-col gap-5">
              <p>Program: {student.currentEducation.program}</p>
              <p>Major / Branch: {student.currentEducation.branch}</p>
              <p>Current Semester: {student.currentEducation.program}</p>
              <p>Institute Roll no.: {student.currentEducation.rollNo}</p>
              <p>Course Start Date: {student.currentEducation.startDate}</p>
              <p>Course End Date: {student.currentEducation.endDate}</p>
              <p>Percentage Equivalent: {student.currentEducation.score}%</p>
            </div>
          )}
        </div>
        <div className="mb-10 p-10 border-b">
          <div className="flex justify-between items-center">
            <div className="mb-5 border-b pb-2 border-black border-opacity-60">
              <p className="text-xl font-bold mb-1">Class Xth:</p>
              {student.classXEducation?.endYear ? (
                <small>
                  {new Date(student.classXEducation.endYear).toLocaleString(
                    "en-us",
                    { month: "long" }
                  )}{" "}
                  {new Date(student.classXEducation.endYear).getFullYear()}
                </small>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => setClassX(true)}
              className="button button--secondary"
            >
              {!student.classXEducation ? (
                <>
                  <BiPlusCircle /> Add new
                </>
              ) : (
                <>
                  <BsPencilSquare /> Update
                </>
              )}
            </button>
          </div>
          {student.classXEducation && (
            <div className="flex flex-col gap-5">
              <p>School name: {student.classXEducation.schoolName}</p>
              <p>Board: {student.classXEducation.board}</p>
              <p>
                End Year:{" "}
                {new Date(student.classXEducation.endYear).getFullYear()}
              </p>
              <p>Score: {student.classXEducation.score}%</p>
            </div>
          )}
        </div>
        <div className="mb-10 p-10 border-b">
          <div className="flex justify-between items-center">
            <div className="mb-5 border-b pb-2 border-black border-opacity-60">
              <p className="text-xl font-bold mb-1">Class XIIth:</p>
              {student.classXIIEducation?.endYear ? (
                <small>
                  {new Date(student.classXIIEducation.endYear).toLocaleString(
                    "en-us",
                    { month: "long" }
                  )}{" "}
                  {new Date(student.classXIIEducation.endYear).getFullYear()}
                </small>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => setClassXII(true)}
              className="button button--secondary"
            >
              {!student.classXIIEducation ? (
                <>
                  <BiPlusCircle /> Add new
                </>
              ) : (
                <>
                  <BsPencilSquare /> Update
                </>
              )}
            </button>
          </div>
          {student.classXIIEducation && (
            <div className="flex flex-col gap-5">
              <p>School name: {student.classXIIEducation.schoolName}</p>
              <p>Board: {student.classXIIEducation.board}</p>
              <p>
                End Year:{" "}
                {new Date(student.classXIIEducation.endYear).getFullYear()}
              </p>
              <p>Score: {student.classXIIEducation.score}%</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Education;
