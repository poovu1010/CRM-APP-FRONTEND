import React, { useRef, useState } from "react";
import axios from "axios";
import editicon from "../assets/edit.svg";
import api from "../api/axios";

export default function ProfilePage() {
  // Profile image states
  const [file, setFile] = useState(null);        // actual file
  const [preview, setPreview] = useState(null);  // image preview

  
  const [open, setOpen] = useState(false);

 
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("@gmail.com");
  const [phone, setPhone] = useState("12345678");
  const [address, setAddress] = useState("Your Address");

  const fileRef = useRef();

  
  function handleUploadClick() {
    fileRef.current.click();
  }


  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

 
  async function uploadImage() {
    try {
      const formData = new FormData();
      formData.append("profile_img", file);

      const res = await api.post(
        "/upload",
        formData
      );

      console.log("Uploaded:", res.data);

      alert("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
    }
  }

 
  function cancelImage() {
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-24 h-24 relative rounded-full bg-black flex items-center justify-center text-white text-xl font-bold overflow-hidden">

              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <h1>P</h1>
              )}

              {/* Edit button */}
              <button
                className="h-7 w-7 absolute bottom-0 right-0"
                onClick={handleUploadClick}
              >
                <img src={editicon} alt="edit" />
              </button>

              <input
                type="file"
                ref={fileRef}
                onChange={handleChange}
                hidden
              />
            </div>
          </div>

          {/* Upload / Cancel buttons */}
          {file && (
            <div className="mt-5 flex justify-center gap-4">

              <button
                className="bg-gray-300 px-4 py-1.5 rounded-2xl"
                onClick={cancelImage}
              >
                Cancel
              </button>

              <button
                className="bg-black text-white px-4 py-1.5 rounded-2xl"
                onClick={uploadImage}
              >
                Upload
              </button>

            </div>
          )}

          {/* Name + Role */}
          <h1 className="mt-4 text-xl font-semibold">{name}</h1>
          <p className="text-gray-500 text-sm">Role / Tailor</p>

          {/* Edit Profile Button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-3 text-sm px-3 py-1 rounded-lg bg-black text-white"
          >
            Edit Profile
          </button>
        </div>

        {/* Personal Info */}
        <div className="mt-4 bg-white rounded-2xl shadow-md p-5">

          <h2 className="text-lg font-semibold mb-4">
            Personal Information
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <h1 className="text-gray-500">Full Name</h1>
              <p className="font-medium">{name}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <h1 className="text-gray-500">Email</h1>
              <p className="font-medium">{email}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <h1 className="text-gray-500">Phone</h1>
              <p className="font-medium">{phone}</p>
            </div>

            <div className="flex justify-between">
              <h1 className="text-gray-500">Address</h1>
              <p className="font-medium text-right">{address}</p>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-5 rounded-xl w-80">

            <h2 className="text-lg font-bold mb-3">Edit Profile</h2>

            <input
              className="border w-full p-2 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              className="border w-full p-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="border w-full p-2 mb-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />

            <input
              className="border w-full p-2 mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />

            <div className="flex justify-between mt-4">

              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                className="bg-black text-white px-4 py-1 rounded"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}