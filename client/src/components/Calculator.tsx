import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
type calculator = {
  show: boolean;
  onHide: () => void;
};

const Calculator: React.FC<calculator> = ({ show, onHide }) => {
  const [principal, setPrincipal] = useState<number>();
  const [annualRate, setAnnualRate] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [potentialReturns, setPotentialReturns] = useState<number>();

  function calculatePotentialReturns(
    principal: number,
    annualRate: number,
    duration: number
  ) {
    const rate = annualRate / 100;
    const finalAmount = principal * Math.pow(1 + rate, duration);
    setPotentialReturns(finalAmount);
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (principal && annualRate && duration) {
      calculatePotentialReturns(principal, annualRate, duration);
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Investment calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formGroupprincipal">
              <Form.Label>Amount to invest:</Form.Label>
              <Form.Control
                type="number"
                name="principal"
                min={1000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                placeholder="Amount to invest..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAnnualRate">
              <Form.Label>Annual rate</Form.Label>
              <Form.Control
                type="number"
                name="AnnualRate"
                value={annualRate}
                min={1}
                max={100}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                placeholder="Annual rate for you opprtiunity"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDuration">
              <Form.Label>Duration of opprtunity</Form.Label>
              <Form.Control
                type="number"
                name="Duration"
                value={duration}
                min={1}
                max={25}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder=""
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#17a2b8",
                borderColor: "#17a2b8",
                borderRadius: "20px",
              }}
            >
              Calculate!
            </Button>
          </Form>
          {potentialReturns && (
            <div>
              Your potential returns is: {potentialReturns.toFixed(2)}${" "}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calculator;
