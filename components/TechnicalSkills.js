import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillCheckCircleFill, BsPencilSquare } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Modal from "./Modal";
import Overlay from "./Overlay";

const ModalBox = ({ student, id }) => {
  const [skill, setSkill] = useState(
    id
      ? student.skills.find((el) => el._id === id)
      : {
          skill: "",
          level: "",
        }
  );

  const add = async () => {
    const addSkill = toast.loading("Saving...");

    const res = await fetch("/api/addSkill", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        skill: skill.skill,
        level: skill.level,
      }),
    });
    if (res.status === 201) {
      toast.success("Added", { id: addSkill });
      window.location.reload();
    } else {
      toast.error(`Error: ${res.data}`, { id: addSkill });
    }
  };

  const update = async () => {
    const updating = toast.loading("Updating...");
    const res = await fetch("/api/updateSkill", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        skill: skill.skill,
        level: skill.level,
        id: skill._id,
      }),
    });
    if (res.status === 201) {
      toast.success("Updated", { id: updating });
      window.location.reload();
    } else {
      toast.error(`Error: ${res.data}`, { id: updating });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !id ? add() : update();
  };
  return (
    <>
      <Modal>
        <div className="border-b flex justify-center items-center py-5">
          Add new Skill
        </div>
        <div className="p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10">
              <div className="input-field">
                <label htmlFor="skill" className="label">
                  Skill:
                </label>
                <input
                  type="text"
                  className="input"
                  id="skill"
                  defaultValue={skill.skill}
                  onChange={(e) =>
                    setSkill({ ...skill, skill: e.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="level" className="label">
                  Select Skill Level:
                </label>
                <select
                  id="level"
                  className="input"
                  defaultValue={skill.level}
                  onChange={(e) =>
                    setSkill({ ...skill, level: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a skill level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>
            <div className="pt-10 flex justify-center items-center">
              <button type="submit" className="flex items-center button">
                <BsFillCheckCircleFill />
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

const TechnicalSkills = ({ student }) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const removeSkill = async (id) => {
    const removing = toast.loading("Removing...");
    const skill = student.skills.find((el) => el._id === id);
    const res = await fetch("/api/removeSkill", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        skill: skill.skill,
        level: skill.level,
        id: skill._id,
      }),
    });
    if (res.status === 201) {
      toast.success("Removed", { id: removing });
      window.location.reload();
    } else {
      toast.error(`Error: ${res.data}`, { id: removing });
    }
  };

  return (
    <>
      <Toaster />
      {modal && (
        <div onClick={() => setModal(false)}>
          <Overlay />
        </div>
      )}
      {modal &&
        (id !== "" ? (
          <ModalBox student={student} id={id} />
        ) : (
          <ModalBox student={student} />
        ))}
      <div className="h-full w-full p-10">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold uppercase mb-5">Technical Skills</p>
          <button
            className="button button--secondary"
            onClick={() => {
              setModal(true);
              setId("");
            }}
          >
            <AiOutlinePlusCircle /> Add new
          </button>
        </div>
        <div className="py-10">
          {student.skills.map((skill) => (
            <div
              key={skill._id}
              className="grid grid-cols-3 justify-start items-center bg-gray-100 p-5 mb-5 rounded-md overflow-hidden before:h-1/4 before:w-1 before:bg-black before:absolute before:left-0 relative before:rounded-full"
            >
              <p className="font-bold">{skill.skill}</p>
              <p>{skill.level}</p>
              <div className="flex gap-5 items-center justify-self-end">
                <BsPencilSquare
                  className="cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    setId(skill._id);
                  }}
                />
                <BiTrash
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechnicalSkills;
