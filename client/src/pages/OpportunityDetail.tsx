import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import opportunities from "../data/InvestmentData";
import useAccount from "../hooks/useAccount";
import InvestForm from "../components/invest/InvestForm";
type OpportunityDetailsProps = {};

const OpportunityDetail: React.FC<OpportunityDetailsProps> = () => {
  const [invest, setInvest] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const { isLoggedIn } = useAccount();
  const { id } = useParams<{ id: string }>();
  const opportunityId = id ? parseInt(id, 10) : null;
  const opportunity = opportunities.find((opp) => opp.id === opportunityId);

  const investNow = () => {
    if (isLoggedIn) {
      setInvest(!invest);
    } else {
      setInvest(false);
      setModalShow(true);
    }
  };

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
      <Container fluid className="d-flex align-items-center justify-content-center flex-grow-1 py-3">
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
                <Button as={Link as any} to="/" style={{ marginRight: "2%" }} className="btn-md btn-more">
                  Go back
                </Button>

                <Button style={{ marginLeft: "2%" }} onClick={investNow} className="btn-md btn-more">
                  Invest now!
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div style={{ "paddingBottom": "2%" }}>
        {invest && isLoggedIn && <InvestForm isLoggedIn={isLoggedIn} lowestToInvest={opportunity.lowestInvestment} remainingAmount={opportunity.remainingValue} totalAmount={opportunity.totalValue} opprtunityId={opportunity.id} />}
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

export default OpportunityDetail;