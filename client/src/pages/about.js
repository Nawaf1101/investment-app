import React from 'react'

const about = () => {
  return (
    <div>
      <Container className="py-5">
          <Row className="justify-content-center">
            <h1 className="display-3 fw-bold" style={{ color: '#4C95A0' }}>Villa Investments</h1>
          </Row>
        </Container>
        <Container className="pt-5"> {/* This adds padding to the top of the container */}
          <Row className="align-items-center"> {/* This centers the content vertically */}
            <Col md={6}>
              <h6 className="display-5 fw-bold" style={{ color: '#68B0BB' }}>Who we are?</h6>
              <p className="text-start lead fw-normal mb-4">
                At Villa Capital, we specialize in diversifying investment opportunities within the real estate sector.
              </p>
            </Col>
            <Col md={6} className="text-md-right"> {/* This aligns the column content to the right on medium devices and up */}
              <img src={villaImage} alt="Villa" className="img-fluid" style={{ maxHeight: '300px' }} /> {/* You can adjust maxHeight as needed */}
            </Col>
          </Row>
        </Container>

    </div>
  )
}

export default about