import React from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
export default function Demo() {
  toast("hello");
  toast.success("logined");
  return (
    <>
      hhh
      <ToastContainer />
    </>
  );
}
