import React, { useEffect, useRef, useState } from "react";
import { Card, ProgressBar, Container, Row, Col } from "react-bootstrap";
import "../cssFiles/Custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "./CustomButton";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useInvestmentData from "../data/useInvestmentData";

const calculateProgress = (totalValue: number, remainingValue: number) => {
  const fundedValue = totalValue - remainingValue;
  return (fundedValue / totalValue) * 100;
};

const OpportunityCard = () => {
  const controls = useAnimation();
  const [isHovered, setHovered] = useState(false);
  const { opportunities } = useInvestmentData();
  const scope = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.01, // Adjust the threshold value as needed
  });

  useEffect(() => {
    if (inView) {
      setHovered(true);
    }
  }, [inView]);

  useEffect(() => {
    if (scope.current) {
      controls.start({ opacity: 1 });
    }
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      className="opportunity-card-wrapper"
    >
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
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? "100%" : 0 }}
                      transition={{ duration: 1 }} // Adjust the duration as needed
                      className="progress-custom"
                    >
                      <ProgressBar
                        now={calculateProgress(
                          opportunity.totalValue,
                          opportunity.remainingValue
                        )}
                      />
                    </motion.div>
                    <div className="progress-text">
                      {calculateProgress(
                        opportunity.totalValue,
                        opportunity.remainingValue
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                  <Row className="mt-3">
                    <Col xs={12} md={6} className="text-left">
                      <Card.Text>
                        <strong>Total value: </strong>$
                        {opportunity.totalValue.toLocaleString()}
                      </Card.Text>
                    </Col>
                    <Col xs={12} md={6} className="text-left">
                      <Card.Text>
                        <strong>Lowest investment: </strong>$
                        {opportunity.lowestInvestment.toLocaleString()}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="mt-1" />
                  <Row>
                    <Col xs={12} md={6} className="text-left">
                      <Card.Text>
                        <strong>Potential return: </strong>
                        {opportunity.potentialReturn}
                      </Card.Text>
                    </Col>
                    <Col xs={12} md={6} className="text-left">
                      <Card.Text>
                        <strong>Time horizon: </strong>
                        <br />
                        {opportunity.duration.toLocaleString()} Years
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="mt-1" />
                  <Row>
                    <Card.Text>
                      <strong>Annual rate: </strong>
                      {opportunity.annualRate}%
                    </Card.Text>
                  </Row>
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
    </motion.div>
  );
};

export default OpportunityCard;
