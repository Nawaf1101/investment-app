import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import useInvest from "./useInvest";
import { toast } from "react-toastify";

type investForm = {
    lowestToInvest: number,
    totalAmount: number,
    remainingAmount: number,
    opprtunityId: number,
    isLoggedIn: boolean
}
const InvestForm: React.FC<investForm> = ({ lowestToInvest, remainingAmount, opprtunityId, isLoggedIn }) => {
    const [numberOfUnits, setNumberOfUnits] = useState<number>(lowestToInvest);
    const { submitInvest } = useInvest();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfUnits(Number(e.target.value));
    };

    const handleBlur = () => {
        if (numberOfUnits > remainingAmount) {
            setNumberOfUnits(remainingAmount);
        } else if (numberOfUnits < lowestToInvest) {
            setNumberOfUnits(lowestToInvest);
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let value = numberOfUnits;
        if (value > remainingAmount) {
            value = remainingAmount;
            setNumberOfUnits(value);
        }
        if (value < lowestToInvest) {
            value = lowestToInvest;
            setNumberOfUnits(value);
        }

        if (value >= lowestToInvest && value <= remainingAmount && isLoggedIn) {
            submitInvest(value, opprtunityId)
            console.log("Form submitted with:", value);
        } else {
            toast.error("Invalid amount")
            console.log("Invalid amount");
        }
    };

    return (
        <Container
            style={{
                backgroundColor: "#FFF",
                padding: "2rem",
                borderRadius: "15px",
                maxWidth: "400px",
                marginBottom: "auto",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className="align-items-center justify-content-center">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formGroupNumOfUnit">
                    <Form.Label>How much to invest? (max {remainingAmount})</Form.Label>
                    <Form.Control
                        type="number"
                        name="numberOfUnits"
                        value={numberOfUnits}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min={lowestToInvest}
                        max={remainingAmount}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        width: "100%",
                        borderRadius: "20px",
                    }}
                    className="btn-more"
                >
                    Invest
                </Button>
            </Form>
        </Container>
    );
};

export default InvestForm;
