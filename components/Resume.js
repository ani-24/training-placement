import React, { useEffect, useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { AiOutlineFileSearch } from "react-icons/ai";

const Resume = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    console.log(objectUrl);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
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
    const data = new FormData();
    data.append("file", selectedFile);
    console.log(data.file);
    const res = await fetch("/api/multer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: selectedFile,
      }),
    });
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-center max-w-xl">
        <p className="text-5xl mb-5">¯\_(ツ)_/¯</p>
        <h3 className="text-xl font-semibold">No Resume uploaded</h3>
        <p className="my-5">
          You have not added your resume yet. Please click here to add your
          resume.
        </p>
        <form action="/api/multer" method="POST">
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
  );
};

export default Resume;
