import React, { useEffect, useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { AiOutlineFileSearch } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";

const Resume = ({ student }) => {
  const [resume, setResume] = useState(student.resume);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploading = toast.loading("Uploading...");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "training-placement");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/drwuytqnc/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    const res = await fetch("/api/addResume", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sid: student.sid,
        resume: data.secure_url,
      }),
    });

    if (res.status === 201) {
      toast.success("Uploaded", { id: uploading });
      setResume(data.secure_url);
      setPreview();
    } else {
      toast.error(`Error: ${res.data}`, { id: uploading });
    }
  };

  return (
    <>
      <Toaster />
      {!student.resume ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className="text-center max-w-xl">
            <p className="text-5xl mb-5">¯\_(ツ)_/¯</p>
            <h3 className="text-xl font-semibold">No Resume uploaded</h3>
            <p className="my-5">
              You have not added your resume yet. Please click here to add your
              resume.
            </p>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="resume"
                className="inline-flex button cursor-pointer mb-10"
              >
                <AiOutlineFileSearch /> Choose Resume
              </label>
              <input
                type="file"
                id="resume"
                className="hidden"
                accept=".pdf"
                name="file"
                onChange={onSelectFile}
              />
              {preview && (
                <>
                  <object
                    data={preview}
                    type="application/pdf"
                    width="100%"
                    height={500}
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={preview}>to the PDF!</a>
                    </p>
                  </object>
                  <button
                    type="submit"
                    className="button inline-flex button cursor-pointer mt-10"
                  >
                    <GoCloudUpload /> Upload Resume
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      ) : (
        <>
          <object
            data={resume}
            type="application/pdf"
            width="100%"
            height="80%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={preview}>to the PDF!</a>
            </p>
          </object>
          <div className="flex my-10 justify-center items-center border-t py-10">
            <form onSubmit={handleSubmit} className="text-center w-full">
              <label
                htmlFor="resume"
                className="inline-flex button cursor-pointer mb-10"
              >
                <AiOutlineFileSearch /> Change Resume
              </label>
              <input
                type="file"
                id="resume"
                className="hidden"
                accept=".pdf"
                name="file"
                onChange={onSelectFile}
              />
              {preview && (
                <>
                  <object
                    data={preview}
                    type="application/pdf"
                    width="100%"
                    height={500}
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={preview}>to the PDF!</a>
                    </p>
                  </object>
                  <button
                    type="submit"
                    className="button inline-flex button cursor-pointer mt-10"
                  >
                    <GoCloudUpload /> Upload Resume
                  </button>
                </>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Resume;
