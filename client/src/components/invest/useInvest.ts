import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useInvestmentData from "../../data/useInvestmentData";

const useInvest = () => {
  const navigate = useNavigate();
  const { opportunities, editOpportunities } = useInvestmentData();

  const submitInvest = async (
    amountToInvest: number,
    opportunityId: number
  ) => {
    try {
      // Find the opportunity by its ID
      const opportunityIndex = opportunities.findIndex(
        (op) => op.id === opportunityId
      );

      if (opportunityIndex !== -1) {
        // Subtract the amount to invest from the remaining value
        const updatedOpportunities = [...opportunities];
        console.log(opportunityIndex);
        updatedOpportunities[opportunityIndex].remainingValue =
          updatedOpportunities[opportunityIndex].remainingValue -
          amountToInvest;
        console.log(updatedOpportunities);

        // Update the opportunities state
        editOpportunities(updatedOpportunities);

        // Log or perform any additional actions needed after the update
        navigate("/");
        toast.success(`Congratulations on investing with us!`);
      } else {
        toast.error(`Opportunity with ID ${opportunityId} not found.`);
      }
    } catch (error: any) {
      toast.error(
        `An error occurred while submitting the investment: ${error.message}`
      );
    }
  };

  return {
    submitInvest,
  };
};

export default useInvest;
