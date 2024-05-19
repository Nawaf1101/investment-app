import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import opportunities from "../data/InvestmentData";

const calculateProgress = (totalValue, remainingValue) => {
  const fundedValue = totalValue - remainingValue;
  return (fundedValue / totalValue) * 100;
};

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const opportunityId = id ? parseInt(id, 10) : null;
  const opportunity = opportunities.find((opp) => opp.id === opportunityId);

  if (!opportunity) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="my-5 flex-grow-1 d-flex align-items-center justify-content-center">
          <Row>
            <Col>
              <h2>Opportunity not found</h2>
              <Button as={Link as any} to="/" variant="primary">
                Go back
              </Button>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center flex-grow-1 py-3"
      >
        <Row className="justify-content-center">
          <Col md={6} className="text-center pe-md-0">
            <img
              src={opportunity.imageUrl}
              alt="InvestOpportunity"
              className="img-fluid img-max-height mb-4"
            />
          </Col>
          <Col md={5} className="ps-2">
            <h1 className="display-6 text-opportunity-title mb-1">
              {opportunity.name}
            </h1>
            <h2 className="h5 mb-1 text-opportunity">Description</h2>
            <p className="fs-6 mb-4">{opportunity.description}</p>
            <h2 className="h5 mb-1 text-opportunity">Potential return</h2>
            <p className="fs-6 mb-4">{opportunity.potentialReturn}</p>
            <Row className="g-2">
              <Col sm={6}>
                <h2 className="h5 mb-1 text-opportunity">Unit price</h2>
                <p className="fs-6 mb-4">{opportunity.unitPrice}$</p>
              </Col>
              <Col sm={6}>
                <h2 className="h5 mb-1 text-opportunity">Number of units</h2>
                <p className="fs-6 mb-4">{opportunity.numberOfUnits}</p>
              </Col>
            </Row>
            <h2 className="h5 mb-1 text-opportunity">Minimum investment</h2>
            <p className="fs-6 mb-4">{opportunity.lowestInvestment}$</p>
            <Row className="mt-3">
              <Col className="d-flex justify-content-center">
                <Button as={Link as any} to="/" className="btn-md btn-more">
                  Go back
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default OpportunityDetail;
