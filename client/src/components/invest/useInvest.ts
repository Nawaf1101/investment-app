import { useNavigate } from "react-router-dom";
import { InvestData, useAPI } from "../../apis/useAPI";
import useAccount from "../../hooks/useAccount";

const useInvest = () => {
    const { handleInvest } = useAPI();
    const { user } = useAccount();

    const navigate = useNavigate();

    const submitInvest = async (amountToInvest, opprtunityId) => {
        try {
            let email = user.email
            let investData: InvestData = { email, amountToInvest, opprtunityId }
            let status = await handleInvest(investData)
            if (status)
                navigate("/")
        } catch (error: any) { }
    };

    return {
        submitInvest
    }

}

export default useInvest;