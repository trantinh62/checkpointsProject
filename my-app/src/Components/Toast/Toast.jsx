import { toast } from "react-toastify";
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
  if (typeofToast === "warning") return toast.warning(message, attrObj);
  if (typeofToast === "info") return toast.info(message, attrObj);
  if (typeofToast === "success") return toast.success(message, attrObj);
}
export default Toast;
