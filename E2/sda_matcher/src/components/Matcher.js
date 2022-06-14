import React, { Component } from "react";
import { Modal, Button, Carousel, Col, Row, Container } from "react-bootstrap";

function getStyleTransfer(input, style){
    fetch(`/getstyletransfer/${input}/${style}`)
      .then(function (response) {
          return response.text();
      }).then(function (text) {
          console.log('GET response text:');
          console.log(text);
      });
}

class Matcher extends Component {

    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true }, () => {getStyleTransfer('input.png', 'style.png')});
    closeModal = () => this.setState({ isOpen: false });


    render() {
        return (
            <>

                <Container fluid >
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="3">
                        </Col>
                        <Col xs lg="3">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                                        alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel></Col>
                        <Col xs lg="3">
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="3"></Col>
                        <Col xs lg="3">
                            <Button variant="primary" onClick={this.openModal}>Match!</Button>
                        </Col>
                        <Col xs lg="3">
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Matcher;