import React, { useState } from "react";
import {
  Card,
  ProgressBar,
  Button,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../cssFiles/Custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import opportunities from "../data/InvestmentData";
import CustomButton from "./CustomButton";

const calculateProgress = (totalValue, remainingValue) => {
  const fundedValue = totalValue - remainingValue;
  return (fundedValue / totalValue) * 100;
};

const OpprtunityCard: React.FC<any> = () => {
  return (
    <Container>
      <Row className="justify-content-center gy-4">
        {opportunities.map((opportunity, index) => (
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={index}
            className="d-flex justify-content-center"
          >
            <Card className="opportunity-card text-center d-flex flex-column h-100">
              <Card.Img
                variant="top"
                src={opportunity.imageUrl}
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title
                  className="text-center"
                  style={{ color: "#226570" }}
                >
                  {opportunity.name}
                </Card.Title>
                <Card.Text className="text-left">
                  {opportunity.brefDescription}
                </Card.Text>
                <div className="progress-custom">
                  <ProgressBar
                    now={calculateProgress(
                      opportunity.totalValue,
                      opportunity.remainingValue
                    )}
                  />
                  <div className="progress-text">
                    {calculateProgress(
                      opportunity.totalValue,
                      opportunity.remainingValue
                    ).toFixed(2)}
                    %
                  </div>
                </div>
                <Card.Text className="mt-3">
                  <strong>Total value: </strong>$
                  {opportunity.totalValue.toLocaleString()}
                </Card.Text>
                <Card.Text>
                  <strong>Lowest investment: </strong>$
                  {opportunity.lowestInvestment.toLocaleString()}
                </Card.Text>
                <Card.Text>
                  <strong>Potential return: </strong>$
                  {opportunity.potentialReturn.toLocaleString()}
                </Card.Text>
                <CustomButton
                  to={`/opportunity/${opportunity.id}`}
                  className="mt-auto btn-more"
                >
                  More information
                </CustomButton>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OpprtunityCard;
