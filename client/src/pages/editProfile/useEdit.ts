import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAccountStore";
import { EditData, useAPI } from "../../apis/useAPI";

const useEdit = () => {
  const { setLogin } = useAuthStore();
  const { onEdit } = useAPI();
  const navigate = useNavigate();

  const submitEdit = async (
    name: string,
    currentEmail: string,
    newEmail: string,
    newPassword: string
  ) => {
    const editData: EditData = { name, currentEmail, newEmail, newPassword };
    try {
      let status = await onEdit(editData);
      if (status) {
        setLogin();
        navigate("/");
      }
    } catch (error: any) { }
  };

  return {
    submitEdit
  }
}
export default useEdit