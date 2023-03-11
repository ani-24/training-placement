import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Education = ({ student }) => {
  const [education, setEducation] = useState({
    program: student.education?.program || "",
    major: student.education?.major || "",
    semester: student.education?.semester || "",
    roll: student.education?.roll || "",
    courseStart: student.education?.courseStart || "",
    courseEnd: student.education?.courseEnd || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updating = toast.loading("Updating...");
    const res = await fetch("/api/updateEducation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        program: education.program,
        major: education.major,
        semester: education.semester,
        roll: education.roll,
        courseStart: education.courseStart,
        courseEnd: education.courseEnd,
      }),
    });
    if (res.status === 201) {
      toast.success("Updated", { id: updating });
    } else {
      toast.error(`Error: ${res.data}`, { id: updating });
    }
  };

  return (
    <>
      <Toaster />
      <form
        className="flex justify-center items-center flex-col w-full gap-10 h-full"
        onSubmit={handleSubmit}
      >
        <div className="grid lg:grid-cols-2 gap-8 w-3/4">
          <div className="input-field">
            <label htmlFor="program" className="label">
              Program *
            </label>
            <input
              type="text"
              className="input"
              id="program"
              defaultValue={education.program}
              onChange={(e) =>
                setEducation({ ...education, program: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="branch" className="label">
              Major/Branch *
            </label>
            <input
              type="text"
              className="input"
              id="branch"
              defaultValue={education.branch}
              onChange={(e) => {
                setEducation({ ...education, major: e.target.value });
              }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="semester" className="label">
              Select current semester *
            </label>
            {/* <input type="text" className="input" id="branch" /> */}
            <select
              name="semester"
              id="semester"
              className="input input--dropdown"
              defaultValue={education.semester}
              onChange={(e) =>
                setEducation({ ...education, semester: e.target.value })
              }
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="roll" className="label">
              Institute Roll no. *
            </label>
            <input
              type="text"
              className="input"
              id="roll"
              defaultValue={education.instituteRollNo}
              onChange={(e) =>
                setEducation({ ...education, roll: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="course-start" className="label">
              Selected Course start date *
            </label>
            <input
              type="date"
              className="input"
              id="course-start"
              defaultValue={education.courseStartDate}
              onChange={(e) =>
                setEducation({ ...education, courseStart: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="course-end" className="label">
              Selected Course end date *
            </label>
            <input
              type="date"
              className="input"
              id="course-end"
              defaultValue={education.courseEndDate}
              onChange={(e) =>
                setEducation({ ...education, courseEnd: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </>
  );
};

export default Education;
