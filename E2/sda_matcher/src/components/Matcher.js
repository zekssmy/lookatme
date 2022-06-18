import React, { Component, useState } from "react";
import { Modal, Button, Carousel, Col, Row, Container, Form } from "react-bootstrap";

function getStyleTransfer(input, style) {
    fetch(`/getstyletransfer/${input}/${style}`)
        .then(function (response) {
            return response.text();
        }).then(function (text) {
            console.log('GET response text:');
            console.log(text);
        });
}

function download(obj, file, reader) {
    const imageUrl = `/download/${file}`;
    var myImage = document.querySelector('#input');
    fetch(imageUrl)
        .then(response => response.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it
            const imageObjectURL = URL.createObjectURL(imageBlob);

            reader.readAsDataURL(imageBlob);
            obj.setState({ profileImg: reader.result })
            //myImage.src = imageObjectURL
            /*
            var reader = new FileReader();
            reader.readAsDataURL(imageBlob);
  
  
            reader.onloadend = function() {
                var base64data = reader.result;
                console.log(base64data);
            }
            console.log("Before setState")
  
            //reader.readAsDataURL(imageObjectURL)
            console.log(imageObjectURL);
  
             */
        });
}

class Matcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: false,
            profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

        };
    }

    state = {
        isOpen: false,
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    };

    handleClose = () => this.setState({ show: false });

    handleShow = () => this.setState({ show: true }, () => {
        //var filename = getStyleTransfer('input.png', 'style.png'); 
        var filename = "input.png_styled.jpg"
        const reader = new FileReader();
        download(this, filename, reader)
    });

    openModal = () => this.setState({ isOpen: true }, () => { getStyleTransfer('input.png', 'style.png') });
    closeModal = () => this.setState({ isOpen: false });


    render() {
        const { profileImg } = this.state

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
                            <Button variant="primary" onClick={this.handleShow}>Match!</Button>
                        </Col>
                        <Col xs lg="3">
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.show} onHide={this.handleClose} animation={false} dialogClassName=".modal-90w" style={{display:'flex'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>It's a Match!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <img src={profileImg} alt="" id="img" className="img" style={{ width: 300, height: 300 }} />

                                </Col>
                                <Col md="auto">
                                    <img src={profileImg} alt="" id="img" className="img" style={{ width: 300, height: 300 }} />

                                </Col>
                            </Row>
                            <Row className="mt-5"> 
                                <Form.Label>Who Am I? An Introduction</Form.Label>
                                <Form.Control as="text" rows={5} />
                            </Row>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Matcher;