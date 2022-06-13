import React, { Component } from "react";
import { Modal, Button, Col, Row, Container, Form } from "react-bootstrap";
import Webcam from "react-webcam";

class Home extends Component {


    state = {
        isOpen: false,
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    render() {

        const { profileImg } = this.state
        return (
            <>

                <Container fluid>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="2">

                        </Col>
                        <Col xs lg="2">
                            <Container>
                                {/*<div className="input-group">
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
                                <div className="page">
                                    <div className="container">
                                        <h1 className="heading">Add your Image</h1>
                                        <div className="img-holder">
                                            <img src={profileImg} alt="" id="img" className="img" />
                                        </div>
                                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
                                        <div className="label">
                                            <label className="image-upload" htmlFor="input">
                                                <i className="material-icons">add_photo_alternate</i>
                                                Choose your Photo
                                            </label>
                                        </div>
                                    </div>
                                </div>*/}
                                <div className="page">
                                    <div className="container">
                                        <h2 className="heading">Add your Image</h2>
                                        <div className="img-holder">
                                            <img src={profileImg} alt="" id="img" className="img" style={{ width: 300, height: 300 }} />
                                        </div>
                                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
                                        <div className="label">
                                            <label className="image-upload" htmlFor="input">
                                                Choose your Photo
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Container>

                        </Col>
                        <Col xs lg="2">
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs lg="3"></Col>
                        <Col xs lg="3"></Col>
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
