import Image from "next/image";
import { useEffect, useState } from "react";
import { RiGalleryUploadFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const About = ({ student }) => {
  const [avatar, setAvatar] = useState(student.avatar);
  const [fname, setFname] = useState(student.fname);
  const [lname, setLname] = useState(student.lname);
  const [dob, setDob] = useState(student.dob);
  const [college, setCollege] = useState(student.college);
  const [course, setCourse] = useState(student.course);
  const [batch, setBatch] = useState(student.batch);
  const [roll, setRoll] = useState(student.roll);

  const [preview, setPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updating = toast.loading("Updating...");
    let avatarUrl = avatar;
    if (preview) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "training-placement");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/drwuytqnc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      avatarUrl = data.secure_url;
    }
    const res = await fetch("/api/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        avatar: avatarUrl,
        fname,
        lname,
        dob,
        college,
        course,
        batch,
        roll,
      }),
    });
    if (res.status === 201) {
      toast.success("Updated", { id: updating });
    } else {
      toast.error(`Error: ${res.data}`, { id: updating });
    }
  };

  const logout = () => {
    Cookies.remove("student");
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
  }, [selectedImage]);

  return (
    <>
      <Toaster />
      <form
        className="flex justify-center items-center flex-col w-full gap-10 h-full"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="avatar"
          className="h-24 w-24 rounded-full overflow-hidden relative group cursor-pointer border"
        >
          <Image
            src={preview ? preview : avatar}
            alt={fname ? fname : "User profile"}
            width={96}
            height={96}
            priority
          />
          <div className="z-10 absolute bottom-0 bg-black text-white h-1/2 flex justify-center items-center w-full text-lg bg-opacity-75 translate-y-full duration-150 ease-out group-hover:translate-y-0">
            <RiGalleryUploadFill />
          </div>
        </label>
        <input
          type="file"
          className="hidden"
          id="avatar"
          name="file"
          onChange={onSelectFile}
        />
        <div className="grid lg:grid-cols-2 gap-8 w-3/4">
          <div className="input-field">
            <label htmlFor="fname" className="label">
              First name:
            </label>
            <input
              type="text"
              className="input"
              id="fname"
              name="fname"
              defaultValue={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="lname" className="label">
              Last name:
            </label>
            <input
              type="text"
              className="input"
              id="lname"
              name="lname"
              defaultValue={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="dob" className="label">
              Date of Birth:
            </label>
            <input
              type="date"
              className="input"
              id="dob"
              max={"2003-12-31"}
              min={"1997-01-01"}
              name="dob"
              defaultValue={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="college" className="label">
              Current / Latest college:
            </label>
            <input
              type="text"
              className="input"
              id="college"
              name="college"
              defaultValue={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="course" className="label">
              Current Course:
            </label>
            <input
              type="text"
              className="input"
              id="course"
              name="course"
              defaultValue={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="batch" className="label">
              Batch:
            </label>
            <input
              type="text"
              className="input"
              id="batch"
              name="batch"
              defaultValue={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="roll" className="label">
              Roll no:
            </label>
            <input
              type="text"
              className="input"
              id="roll"
              defaultValue={roll}
              name="roll"
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="sid" className="label">
              Student's id:
            </label>
            <input
              type="text"
              className="input"
              id="sid"
              defaultValue={student.sid}
              disabled
              name="sid"
            />
          </div>
        </div>
        <button type="submit" className="button">
          Update
        </button>
      </form>
    </>
  );
};

export default About;
