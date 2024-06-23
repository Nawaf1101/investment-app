import { useEffect, useState } from "react";
import { useAPI } from "../apis/useAPI";

const useOpprtunitiesData = () => {
    const [opprtunities, setOpprtunities] = useState<Opportunity[]>([]);
    const [refresh, setRefresh] = useState<boolean>(true); // State variable to trigger useEffect

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://investment-app-api.onrender.com:10000/opprtunities", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setOpprtunities(data);
                } else {
                    throw new Error("Network response was not ok.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [refresh]);

    return {
        opprtunities,
        setOpprtunities,
        setRefresh,
    };
};

export default useOpprtunitiesData;

export type Opportunity = {
    imageUrl: string;
    id: number;
    name: string;
    bref_description: string;
    description: string;
    potential_return: string;
    lowest_investment: number;
    total_value: number;
    unit_price: number;
    number_of_units: number;
    remaining_value: number;
};
