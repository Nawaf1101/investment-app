import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAccountStore";
import { LoginData, SignupData, EditData, useAPI } from "../../apis/useAPI";

const useSignup = () => {
    const { setLogin } = useAuthStore();
    const { onSignup } = useAPI();
    const navigate = useNavigate();
  
    const submitSignup = async (
        name: string,
        email: string,
        password: string
      ) => {
        try {
          const signupData: SignupData = { email, name, password };
          let isAccountCreated = await onSignup(signupData);
          if (isAccountCreated) {
            setLogin();
            navigate("/");
          }
        } catch (error: any) {}
      };
    
      return{
        submitSignup
      }

}

export default useSignup;