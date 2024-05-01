import React from 'react'

const Contact = () => {
  return (
    <div>

<Container className="pt-3">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h2>Contact Us</h2>
            <p className="mb-4">Most calendars are designed for teams. Slate is designed for freelancers</p>
            <Form className="contact-form p-4 shadow">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="text" placeholder="Your Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Control as="textarea" rows={3} placeholder="Your Message" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>

    </div>
  )
}

export default Contact