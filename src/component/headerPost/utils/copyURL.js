import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const copyURL = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    toast.success("URL이 복사되었습니다!", {
      position: "bottom-center",
      autoClose: 3000, // 3초 후 닫힘
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "custom-toast", // 커스텀 스타일
    });
  });
};