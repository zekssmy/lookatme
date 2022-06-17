import React, { Component } from "react";
import { Modal, Button, Col, Row, Container, Form } from "react-bootstrap";
import Webcam from "react-webcam";

function upload(file) {
    // create form and add file
    var formdata = new FormData();
    formdata.append("snap", file);
    // create AJAX connection
    fetch("/upload", {
        method: 'POST',
        body: formdata,
    }).then(function(response) {
        return response.blob();
    }).then(function(blob) {
        //console.log(blob);  // it slow down video from server
        //server.src = URL.createObjectURL(blob);
    }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });

}

class Home extends Component {


    state = {
        isOpen: false,
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: false,
            profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        };
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result })
            }
        }
        upload(e.target.files[0]);
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
                                <div className="page input-group">
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
                            <Button variant="primary" onClick={this.handleShow}>Profile</Button>
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body...</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsstyle="primary" onClick={this.handleClose}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Home;
