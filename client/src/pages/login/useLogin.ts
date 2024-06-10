import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAccountStore";
import { LoginData, useAPI } from "../../apis/useAPI";


const useLogin = () => {
  const { setLogin } = useAuthStore();
  const { handleLogin } = useAPI();
  const navigate = useNavigate();


  const submitLogin = async (email: string, password: string) => {
    const loginData: LoginData = { email, password };
    try {
      let status = await handleLogin(loginData);

      if (status) {
        setLogin();
        navigate("/");
      }
    } catch (error: any) { }
  };

  return {
    submitLogin
  }

}

export default useLogin;