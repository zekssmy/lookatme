import React, { Component } from "react";
import { Modal, Button, Col, Row, Container, Form } from "react-bootstrap";
import Multiselect from 'react-bootstrap-multiselect'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import Webcam from "react-webcam";
import * as NumericInput from "react-numeric-input";

function upload(file) {
    // create form and add file
    var formdata = new FormData();
    formdata.append("snap", file);
    // create AJAX connection
    fetch("/upload", {
        method: 'POST',
        body: formdata,
    }).then(function (response) {
        return response.blob();
    }).then(function (blob) {
        //console.log(blob);  // it slow down video from server
        //server.src = URL.createObjectURL(blob);
    }).catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });

}

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

//query: string alter oder hashtags mit semikolon, querytype: string typ age, location, hashtags, clustering
function uploadQuery(query, queryType) {
    fetch(`/uploadquery/${query}/${queryType}`)
        .then(function (response) {
            return response.text();
        }).then(function (text) {
            console.log('GET response text:');
            console.log(text);
        });
}


/*function handleClose2() {
    this.setState({ show: false }, () => {

        console.log(this.checkBoxChecker());
        if (this.state.optionSelected != null) {
            var str = this.state.optionSelected.map(function (elem) {
                return elem.value;
            }).join(";");
            console.log(str);
        }
    })
};*/

function test() {
    console.log('test');
}


class Home extends Component {


    /*state = {
        isOpen: false,
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    };*/

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            show: false,
            profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            optionSelected: null,
            checkedCheckbox: 'clustering',
            age: 20,
            ort: "Karlsruhe"
        };
    }

    artistPlaces = ['Kraupischkehmen (Gumbinnen)', 'Karlsruhe', 'Schelklingen (Württemberg)', 'Umkirch',
        'Paris', 'Steinen (Baden)', 'Heidelberg', 'Freiburg im Breisgau', 'Steißlingen (Radolfzell)', 'Furtwangen',
        'Boom', 'Zürich', 'Brumath (Bas-Rhin)', 'Bradford', 'Erfurt', 'Schwetzingen', 'Stockbridge (Edinburgh)', 'Konstanz', 'Morges']

    hashtagList = [{ value: "Instagram", label: "#Instagram" },
    { value: "Wein", label: "#Wein" }, { value: "Tanzen", label: "#Tanzen" }, { value: "Spiritualität", label: "#Spiritualität" },
    { value: "Self care", label: "#Self care" }, { value: "Theater", label: "#Theater" }, { value: "Mode", label: "#Mode" },
    { value: "Bildung", label: "#Bildung" }, { value: "Kunst", label: "#Kunst" }, { value: "Politik", label: "#Politik" },
    { value: "Cat lover", label: "#Cat lover" }, { value: "Vintage mode", label: "#Vintage Mode" }, { value: "Wandern", label: "#Wandern" },
    { value: "Italien", label: "#Italien" }, { value: "Disney", label: "#Disney" }, { value: "Kochen", label: "#Kochen" },
    { value: "Umweltaktivismus", label: "#Umweltaktivismus" }, { value: "Fotografie", label: "#Fotografie" }, { value: "Outdoor", label: "#Outdoor" },
    { value: "Craft beer", label: "#Craft beer" }, { value: "Fridays for future", label: "#Fridays for Future" }, { value: "Volunteering", label: "#Volunteering" },
    { value: "Was trinken gehen", label: "#Was trinken gehen" }, { value: "Shopping", label: "#Shopping" }, { value: "Backen", label: "#Backen" },
    { value: "Museum", label: "#Museum" }, { value: "reisen", label: "#Reisen" }, { value: "autor", label: "#Autor" },
    { value: "Fitness", label: "#Fitness" }, { value: "Gartenarbeit", label: "#Gartenarbeit" }, { value: "Foodie", label: "#Foodie" },
    { value: "Lesen", label: "#Lesen" }, { value: "Aktivismus", label: "#Aktivismus" }, { value: "Meditieren", label: "#Meditieren" },
    { value: "Astronomie", label: "#Astronomie" }, { value: "Kaffee", label: "#Kaffee" }, { value: "Fußball", label: "#Fußball" },
    { value: "Gin tonic", label: "#Gin Tonic" }, { value: "Picknick", label: "#Picknick" }, { value: "Vegetarisch", label: "#Vegetarisch" },
    { value: "Sushi", label: "#Sushi" }, { value: "Meditation", label: "#Meditation" }, { value: "Festivals", label: "#Festivals" },
    { value: "Diy", label: "#DIY" }, { value: "Brunch", label: "#Brunch" }, { value: "Trivia", label: "#Trivia" },
    { value: "Larp", label: "#Larp" }, { value: "Tracht", label: "#Tracht" }, { value: "Snowboarden", label: "#Snowboarden" },
    { value: "Basketball", label: "#Basketball" }, { value: "Comedy", label: "#Comedy" }, { value: "Vegan", label: "#Vegan" },
    { value: "Brettspiele", label: "#Brettspiele" }, { value: "Dog lover", label: "#Dog lover" }, { value: "Karaoke", label: "#Karaoke" },
    { value: "Astrologie", label: "#Astrologie" }, { value: "musik", label: "#Musik" }, { value: "literatur", label: "#Literatur" },
    { value: "Philosophie", label: "#Philosophie" }, { value: "Schmuck", label: "#Schmuck" }, { value: "Natur", label: "#Natur" },
    { value: "Bonding", label: "#Bonding" }, { value: "Walking", label: "#Walking" }, { value: "Tee", label: "#Tee" },
    { value: "Kultur", label: "#Kultur" }, { value: "Yoga", label: "#Yoga" }, { value: "Gaming", label: "#Gaming" },
    { value: "Vlogging", label: "#Vlogging" }, { value: "Pflanzlich", label: "#Pflanzlich" }, { value: "Golf", label: "#Golf" },
    { value: "Muse", label: "#Muse" }, { value: "Antike", label: "#Antike" }, { value: "Sprachaustausch", label: "#Sprachaustausch" }]


    handleClose = () => this.setState({ show: false }, () => {

        if (this.state.optionSelected != null) {
            var str = this.state.optionSelected.map(function (elem) {
                return elem.value;
            }).join(";");
            console.log(str);
        }


    });
    handleShow = () => this.setState({ show: true });

    saveModal = () => {
        //upload
    }

    imageHandler = (e) => {

        console.log(this.checkedCheckbox);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result })
            }
        }
        upload(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0])
    };

    handleChangeHash = (selected) => {
        this.setState({
            optionSelected: selected
        });
    };

    validate(evt) {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = evt.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    checkForm = () => this.setState({ show: false }, () => {
        var x = "";
        console.log(this.state.checkedCheckbox);
        if (this.state.checkedCheckbox == "age") {
            x = "age";
            var ageString = String(this.state.age);
            console.log(ageString);
            uploadQuery(ageString, x)
        } else if (this.state.checkedCheckbox == "hash") {
            x = "hash";
            if (this.state.optionSelected != null) {
                var hashes = this.state.optionSelected.map(function (elem) {
                    return elem.value;
                }).join(";");
                console.log(hashes);
            }
            uploadQuery(hashes, x)
        } else if (this.state.checkedCheckbox == "ort") {
            x = "ort";
            var place = String(this.state.ort);
            console.log(this.state.ort);
            uploadQuery(place, x)
        } else if (this.state.checkedCheckbox == "clustering") {
            x = "clustering";
            uploadQuery("", x)
        }

        console.log(x);

    });

    handleChangePlace = event => {
        console.log(event.target.value);
        this.state.ort = event.target.value;
        this.setState({
            ...this.state,
            ort: event.target.value
        })
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

                    <Modal.Body>
                        <span
                            className="d-inline-block"
                            data-toggle="popover"
                            data-trigger="focus"
                            data-content="Please selecet account(s)"
                        >
                            <ReactSelect
                                options={this.hashtagList}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option
                                }}
                                onChange={this.handleChangeHash}
                                allowSelectAll={true}
                                value={this.state.optionSelected}
                            />
                        </span>
                       {/* <select id="lang" onChange={(value) => this.state.ort = value} value={this.state.ort}>
                            {this.artistPlaces.map((item, index) => (
                                <option value={item} key={index + ""}>{item}</option>
                            ))}
                        </select>*/}
                        <div>
                            <select value={this.state.ort} onChange={this.handleChangePlace}>
                                {this.artistPlaces.map((option, index) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <NumericInput className="form-control" id="numInput" min={0} max={150} onChange={(value) => this.state.age = value} />
                        <Form>
                            {
                                <div key={`inline-radio`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="nach Ähnlichkeit"
                                        name="group1"
                                        type='radio'
                                        id={"clustering"}
                                        onChange={(e) => this.state.checkedCheckbox = "clustering"}
                                    />
                                    <Form.Check
                                        inline
                                        label="nach Hashtags"
                                        name="group1"
                                        type={'radio'}
                                        id={"hash"}
                                        onChange={(e) => this.state.checkedCheckbox = "hash"}
                                    />
                                    <Form.Check
                                        inline
                                        label="nach Ort"
                                        name="group1"
                                        type={'radio'}
                                        id={"ort"}
                                        onChange={(e) => this.state.checkedCheckbox = "ort"}
                                    />
                                    <Form.Check
                                        inline
                                        label="nach Alter"
                                        name="group1"
                                        type='radio'
                                        id={"age"}
                                        onChange={(e) => this.state.checkedCheckbox = "age"}
                                    />
                                </div>
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsstyle="primary" onClick={this.checkForm}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Home;
