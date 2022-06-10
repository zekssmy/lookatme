import React, { Component } from "react";
import { Modal, Button, Col, Row, Container } from "react-bootstrap";
import Webcam from "react-webcam";

class Home extends Component {

    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        return (
            <>

                <Container fluid>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="2">
                            1 of 3
                        </Col>
                        <Col md="auto">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                        Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                        </Col>
                        <Col xs lg="2">
                            3 of 3
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="3">1 of 3</Col>
                        <Col xs lg="3">Variable width content</Col>
                        <Col xs lg="3">
                            <Button variant="primary" onClick={this.openModal}>Profile</Button>
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

export default Home;
