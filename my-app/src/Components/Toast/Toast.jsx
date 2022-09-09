<<<<<<< HEAD
import { toast } from "react-toastify";
=======
import React from "react";

import { ToastContainer, toast } from "react-toastify";
>>>>>>> 735c90e42849bb09285ceb8352daa0ce0b3b0304
import "react-toastify/dist/ReactToastify.css";

function Toast(message, typeofToast) {
  const attrObj = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  if (typeofToast === "error") return toast.error(message, attrObj);
<<<<<<< HEAD
  if (typeofToast === "warning") return toast.warning(message, attrObj);
  if (typeofToast === "info") return toast.info(message, attrObj);
  if (typeofToast === "success") return toast.success(message, attrObj);
=======
  else if (typeofToast === "warning") return toast.warning(message, attrObj);
  else if (typeofToast === "info") return toast.info(message, attrObj);
  else if (typeofToast === "success") return toast.success(message, attrObj);
>>>>>>> 735c90e42849bb09285ceb8352daa0ce0b3b0304
}
export default Toast;
