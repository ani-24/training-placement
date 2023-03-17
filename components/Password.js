import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Password = ({ student }) => {
  const [pass, setPass] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newToast = toast.loading("Updating...");
    if (pass.newPass !== pass.confirm) {
      toast.error("Passwords do not match", { id: newToast });
    } else {
      if (pass.newPass.trim() === "") {
        toast.error("Password can not be blank", { id: newToast });
      } else {
        const res = await fetch("/api/updatePassword", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: student._id,
            ...pass,
          }),
        }).then((r) => r.json());

        if (res.message.toLowerCase() === "updated") {
          toast.success(res.message, { id: newToast });
        } else {
          toast.error(`${res.message}`, { id: newToast });
        }
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-[500px]">
          <p className="text-lg font-bold uppercase border-b border-opacity-60 border-black pb-3 mb-20 text-center">
            Change Password
          </p>
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="currentPassword" className="label">
                Current Password:
              </label>
              <input
                type="password"
                className="input"
                id="currentPassword"
                defaultValue={pass.current}
                onChange={(e) => setPass({ ...pass, current: e.target.value })}
              />
            </div>
            <div className="input-field">
              <label htmlFor="newPassword" className="label">
                New Password:
              </label>
              <input
                type="password"
                className="input"
                id="newPassword"
                defaultValue={pass.newPass}
                onChange={(e) => setPass({ ...pass, newPass: e.target.value })}
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="input"
                id="confirmPassword"
                defaultValue={pass.confirm}
                onChange={(e) => setPass({ ...pass, confirm: e.target.value })}
              />
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="button">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Password;
