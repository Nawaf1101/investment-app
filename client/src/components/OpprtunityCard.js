import React from 'react';
import { Card, ProgressBar,Button,Container,Row,Col  } from 'react-bootstrap';
import House from "../images/home.png"
import House2 from "../images/home2.png"
import House3 from "../images/home3.png"
import Tower from "../images/tower.png"
import mall from "../images/mall.png"
import mall2 from "../images/mall2.png"
import '../cssFiles/Custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy data for investment opportunities
const opportunities = [
  {
    imageUrl: House,
    name: 'Serene Garden Villas',
    brefDescription: 'Luxury living in Alkhaledh Gardens',
    description: 'A community of high-end residential villas offering a serene lifestyle with green spaces, smart home technology, and communal amenities.',
    potentialReturn: '8% return',
    lowestInvestment: 800, 
    totalValue: 85000000,
    unitPrice: 350000,
    numberOfUnits: 240,
    remainingValue:82000000
  },
  {
    imageUrl: House2,
    name: 'Eco-friendly Modern Homes',
    brefDescription: 'Sustainable homes in Alkamleh Suburb',
    description: 'Eco-friendly residential project focusing on sustainability, featuring modern designs with solar panels, rainwater harvesting, and energy-efficient appliances.',
    potentialReturn: '6% return',
    lowestInvestment:1500, 
    totalValue: 60000000,
    unitPrice: 200000,
    numberOfUnits: 300,
    remainingValue:15000
  },
  {
    imageUrl: Tower,
    name: 'Alfaisaliya Tower Enhancement',
    brefDescription: 'Renovation of the iconic Alfaisaliya Tower',
    description: 'Upgrade and modernization of the historic Alfaisaliya Tower, transforming it into a mixed-use development with luxury apartments, offices, and retail space.',
    potentialReturn: '10% return',
    lowestInvestment: 3000, 
    totalValue: 200000000,
    unitPrice: 500000,
    numberOfUnits: 400,
    remainingValue:200000000
  },
  {
    imageUrl: House3,
    name: 'Nassreh Villa Complex',
    brefDescription: 'Contemporary villas in the heart of Alnassreh',
    description: 'Exclusive gated community offering contemporary villas with private pools, in close proximity to international schools, hospitals, and shopping centers.',
    potentialReturn: '7% return',
    lowestInvestment: 1000, 
    totalValue: 95000000,
    unitPrice: 400000,
    numberOfUnits: 238,
    remainingValue:10000000
  },
  {
    imageUrl: mall,
    name: 'Blue Sea Shopping Mall',
    brefDescription: 'State-of-the-art commercial complex by the coast',
    description: 'Development of a premier shopping mall featuring international brands, gourmet dining, and entertainment options, strategically located near the bustling coastline.',
    potentialReturn: '9% return',
    lowestInvestment: 1000, 
    totalValue: 120000000,
    unitPrice: 300000,
    numberOfUnits: 400,
    remainingValue:70000000
  },
  {
  imageUrl: mall2,
    name: 'Green Sea Shopping Mall',
    brefDescription: 'Upscale shopping by the coast',
    description: 'A luxurious shopping destination featuring renowned brands, exquisite dining experiences, and family-friendly entertainment options. Strategically located on the vibrant coastline, offering breathtaking sea views.',
    potentialReturn: '9% return',
    lowestInvestment: 1000, 
    totalValue: 150000000,
    unitPrice: 350000,
    numberOfUnits: 428,
    remainingValue:90000000
  },
];

const calculateProgress = (totalValue, remainingValue) => {
  const fundedValue = totalValue - remainingValue;
  return (fundedValue / totalValue) * 100;
};

const OpportunitiesList = () => {
  return (
    <Container >
 <Row className="justify-content-center gy-4">
        {opportunities.map((opportunity, index) => (
          // The 'mb-4' class is used for Bootstrap versions that do not support 'gy-*' classes
          <Col lg={3} md={6} sm={12} key={index} className="mb-4">
          <Card className="opportunity-card text-center d-flex flex-column">
              <Card.Img variant="top" src={opportunity.imageUrl} className="card-img-top" />
              <Card.Body className="d-flex flex-column justify-content-between">                
              <Card.Title className="text-center" style={{ color: '#226570' }}>
                  {opportunity.name}
                </Card.Title>
                <Card.Text className="text-left">
                  {opportunity.brefDescription}
                </Card.Text>
                <ProgressBar className="progress-custom" now={calculateProgress(opportunity.totalValue, opportunity.remainingValue)} min={0} max={100}>
                  <ProgressBar variant="info" now={calculateProgress(opportunity.totalValue, opportunity.remainingValue)} key={1} />
                  <div className="progress-text">
                    {calculateProgress(opportunity.totalValue, opportunity.remainingValue).toFixed(2)}%
                  </div>
                </ProgressBar>
                <Card.Text className="mt-3">
                  <strong style={{ color: '#256D79' }}>Total value:</strong>
                  {opportunity.totalValue.toLocaleString()}$
                </Card.Text>
                <Card.Text>
                  <strong style={{ color: '#256D79' }}>Lowest investment:</strong>
                  {opportunity.lowestInvestment.toLocaleString()}$
                </Card.Text>
                <Button variant="primary" className="mt-auto">More information</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>    
  );
};

export default OpportunitiesList;
