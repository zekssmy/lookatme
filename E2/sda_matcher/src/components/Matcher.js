import React, { Component, useState } from "react";
import { Modal, Button, Carousel, Col, Row, Container, Form } from "react-bootstrap";




var images;
var imagePaths;

var artistList = [{ 'dateiname': 'smf_aug_xxx_01573_003.jpg', 'titel': 'Weibliches Bildnis', 'anzeigeame': 'R. Max Seemann' },
{ 'dateiname': 'smf_aug_xxx_03611_003.jpg', 'titel': 'Selbstbildnis', 'anzeigeame': 'Julius Siegfried Uetz' },
{ 'dateiname': 'smf_aug_xxx_03587_003.jpg', 'titel': 'Brustbild eines jungen Mädchens', 'anzeigeame': 'Julius Siegfried Uetz' },
{ 'dateiname': 'smf_aug_xxx_03514_003.jpg', 'titel': 'Ignaz Speckle (1754-1824), der letzte Abt von St. Peter', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_05796_003.jpg', 'titel': 'Schlafendes Mädchen', 'anzeigeame': 'Sebastian Luz' },
{ 'dateiname': 'smf_aug_xxx_05579_003.jpg', 'titel': 'Bildnis des Herrn Schlömer', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_05580_003.jpg', 'titel': 'Bildnis der Frau Schlömer', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_03510_003.jpg', 'titel': 'Karoline Kaspar, Superiorin in St. Ursula', 'anzeigeame': 'Sebastian Luz' },
{ 'dateiname': 'smf_aug_xxx_03607_003.jpg', 'titel': 'Brustbild einer älteren Dame mit Spitzenhaube', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_05800_003.jpg', 'titel': 'Kopie des Selbstbildnisses der Malerin Louise Vigée-Le-Brun', 'anzeigeame': 'Bardi' },
{ 'dateiname': 'smf_aug_xxx_03725_003.jpg', 'titel': 'Bildnis des Freiherrn Philipp von Fahnenberg', 'anzeigeame': 'Kamill Maria von Schlechta' },
{ 'dateiname': 'smf_aug_xxx_09191_005.jpg', 'titel': 'Brustbild von Johanna Dold', 'anzeigeame': 'Dionys Ganter' },
{ 'dateiname': 'smf_aug_xxx_12529_003.jpg', 'titel': 'Porträt eines Italieners', 'anzeigeame': 'Ernst Hänßler' },
{ 'dateiname': 'smf_aug_xxx_09190_005.jpg', 'titel': 'Brustbild von Nikolaus Dold', 'anzeigeame': 'Dionys Ganter' },
{ 'dateiname': 'smf_aug_xxx_12487_003.jpg', 'titel': 'Männliches Porträt', 'anzeigeame': 'Ernst Hänßler' },
{ 'dateiname': 'smf_aug_xxx_12471_003.jpg', 'titel': 'Porträt einer Italienerin', 'anzeigeame': 'Ernst Hänßler' },
{ 'dateiname': 'smf_aug_xxx_11907_003.jpg', 'titel': 'Brustbild eines jungen Mädchens', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_12360_003.jpg', 'titel': 'Novizin der Barmherzigen Schwestern', 'anzeigeame': 'Jacob Götzenberger' },
{ 'dateiname': 'smf_aug_xxx_12401_003.jpg', 'titel': 'Mutter mit Kind', 'anzeigeame': 'Wilhelm Haller' },
{ 'dateiname': 'smf_aug_xxx_12518_003.jpg', 'titel': 'Bildnis der Stifterin Anna Fedder', 'anzeigeame': 'Sebastian Luz' },
{ 'dateiname': 'smf_aug_xxx_12483_003.jpg', 'titel': 'Porträt einer jungen Frau', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_12415_003.jpg', 'titel': 'Mädchen mit Goldhaube (Gertel Hagemann)', 'anzeigeame': 'Oskar Hagemann' },
{ 'dateiname': 'smf_aug_xxx_11806_003.jpg', 'titel': 'Bildnis des Regens Joseph Dürr', 'anzeigeame': 'Wilhelm Dürr' },
{ 'dateiname': 'smf_aug_xxx_12428_004.jpg', 'titel': 'Porträt eines Jägers', 'anzeigeame': 'Ferdinand Keller' },
{ 'dateiname': 'smf_aug_xxx_1996-138_003.jpg', 'titel': 'Hermine Kopp, geb. Mayer (1848-1913)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_1996-139_003.jpg', 'titel': 'Ferdinand Kopp (geb. 12.02.1848) Oberförster', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_2003-173_003.jpg', 'titel': 'Selbstbildnis', 'anzeigeame': 'Ernst Würtenberger' },
{ 'dateiname': 'smf_aug_xxx_1999-513_003.jpg', 'titel': 'Porträt Hermann Dischler', 'anzeigeame': 'Oskar Arthur Bluhm' },
{ 'dateiname': 'smf_aug_xxx_2003-177_003.jpg', 'titel': 'Betende', 'anzeigeame': 'Ernst Würtenberger' },
{ 'dateiname': 'smf_aug_xxx_2003-125_003.jpg', 'titel': 'Brustbild eines Mannes im Harnisch', 'anzeigeame': 'Wilhelm Trübner' },
{ 'dateiname': 'smf_aug_xxx_2006-001_003.jpg', 'titel': 'Bildnis eines jungen Mannes mit Backenbart', 'anzeigeame': 'Lukas Kirner' },
{ 'dateiname': 'smf_aug_xxx_2001-078_005.jpg', 'titel': 'Junges Mädchen aus dem Hotzenwald', 'anzeigeame': 'Joseph van Lerius' },
{ 'dateiname': 'smf_aug_xxx_m-37-002_003.jpg', 'titel': 'Damenbildnis', 'anzeigeame': 'Georg Balder' },
{ 'dateiname': 'smf_aug_xxx_m-27-004_003.jpg', 'titel': 'Damenporträt', 'anzeigeame': 'Albert Gräfle' },
{ 'dateiname': 'smf_aug_xxx_m-42-002-b_004.jpg', 'titel': 'Bildnis der Kreszentia Faller, geb. Keßler (1796-1832)', 'anzeigeame': 'Conrad Neukam' },
{ 'dateiname': 'smf_aug_xxx_m-77-026_003.jpg', 'titel': 'Porträt einer unbekannten Dame', 'anzeigeame': 'Wilhelm Trübner' },
{ 'dateiname': 'smf_aug_xxx_m-31-005_003.jpg', 'titel': 'Elsässischer Bauer mit roter Weste', 'anzeigeame': 'Gustave Stoskopf' },
{ 'dateiname': 'smf_aug_xxx_m-56-003-a_003.jpg', 'titel': 'Selbstbildnis', 'anzeigeame': 'Lukas Kirner' },
{ 'dateiname': 'smf_aug_xxx_m-56-003-b_003.jpg', 'titel': 'Creszentia Kirner, geb. Knöpfle, Gattin des Künstlers', 'anzeigeame': 'Lukas Kirner' },
{ 'dateiname': 'smf_aug_xxx_m-28-002_003.jpg', 'titel': 'Bildnis der Gattin (von Friedrich Helmle ?)', 'anzeigeame': 'Georg Balder' },
{ 'dateiname': 'smf_aug_xxx_m-25-001_003.jpg', 'titel': 'Fürst Karl Egon II. von Fürstenberg, Porträt', 'anzeigeame': 'Johann Grund' },
{ 'dateiname': 'smf_aug_xxx_m-23-011_003.jpg', 'titel': 'Brustbild des Gutsbesitzer Clauß aus Landau/Pfalz', 'anzeigeame': 'Benjamin Heinrich Orth' },
{ 'dateiname': 'smf_aug_xxx_m-61-007_003.jpg', 'titel': 'Bildnis des Dichters Felix Philippi', 'anzeigeame': 'Wilhelm Trübner' },
{ 'dateiname': 'smf_aug_xxx_m-42-002-a_004.jpg', 'titel': 'Bildnis des Nikolaus Faller (1789-1865)', 'anzeigeame': 'Conrad Neukam' },
{ 'dateiname': 'smf_aug_xxx_m-40-002_003.jpg', 'titel': 'Selbstbildnis mit Samtkappe und Goldquaste', 'anzeigeame': 'Konstantin Kaiser' },
{ 'dateiname': 'smf_aug_xxx_m-54-010_003.jpg', 'titel': 'Porträt des Mundartdichters August Ganther (1862-1938)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-79-019_003.jpg', 'titel': 'Bildnis Esther Kern', 'anzeigeame': 'Albert Hermann Daur' },
{ 'dateiname': 'smf_aug_xxx_m-24-003_003.jpg', 'titel': 'Peter Eugen von Kachthaler als Hauptmann im Grenadierregiment', 'anzeigeame': 'August Bootz' },
{ 'dateiname': 'smf_aug_xxx_m-81-011_003.jpg', 'titel': 'Der Schwabe', 'anzeigeame': 'Alois Hauser' },
{ 'dateiname': 'smf_aug_xxx_m-35-015_005.jpg', 'titel': 'Bildnis der Maria Kreuzer, geb. Laule, in Tracht', 'anzeigeame': 'Johann Baptist Laule' },
{ 'dateiname': 'smf_aug_xxx_m-77-002_003.jpg', 'titel': 'Alice Trübner', 'anzeigeame': 'Wilhelm Trübner' },
{ 'dateiname': 'smf_aug_xxx_m-41-004_003.jpg', 'titel': 'Selbstbildnis', 'anzeigeame': 'Albert Gräfle' },
{ 'dateiname': 'smf_aug_xxx_m-34-017_003.jpg', 'titel': 'Bildnis der Frau Jos. Ruch, geborene Faist', 'anzeigeame': 'Lucian Reich' },
{ 'dateiname': 'smf_aug_xxx_m-24-004_003.jpg', 'titel': 'Maria Magdalena von Kachthaler vor dem Freiburger Münster', 'anzeigeame': 'August Bootz' },
{ 'dateiname': 'smf_aug_xxx_m-56-004_003.jpg', 'titel': 'Karoline Knöpfle aus Günzburg, Schwester von Creszentia Kirner', 'anzeigeame': 'Lukas Kirner' },
{ 'dateiname': 'smf_aug_xxx_m-68-022_003.jpg', 'titel': 'Isabella, Königin von Spanien', 'anzeigeame': 'Franz Xaver Winterhalter' },
{ 'dateiname': 'smf_aug_xxx_m-68-018_003.jpg', 'titel': 'Friedrich Franz Freiherr von Krafft-Festenberg auf Frohnberg zu Zizenhausen (1784-1813)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-68-019_003.jpg', 'titel': 'Maria Fridolina Reichsfreiin Ebing von der Burg (1786-1845)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-85-023_004.jpg', 'titel': 'Frauenporträt mit dunklem Haar', 'anzeigeame': 'Maria Marga Thomass' },
{ 'dateiname': 'smf_aug_xxx_m-62-010_003.jpg', 'titel': 'Nanna als Bacchantin', 'anzeigeame': 'Anselm Feuerbach' },
{ 'dateiname': 'smf_aug_xxx_m-60-047_003.jpg', 'titel': 'Paul Kromer aus Fischbach (1763-1839), Horologifer', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-32-011_005.jpg', 'titel': 'Die Briefleserin', 'anzeigeame': 'Franz Xaver Winterhalter' },
{ 'dateiname': 'smf_aug_xxx_m-60-046_003.jpg', 'titel': 'Maria Kromer, geb. Fürderer, aus Neustadt (1767-1829)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-72-012_003.jpg', 'titel': 'Damenbildnis', 'anzeigeame': 'Schwab, Karl Philipp' },
{ 'dateiname': 'smf_aug_xxx_m-84-016-a_004.jpg', 'titel': 'Porträt der Ehefrau von Karl Jaegler, Lenzkirch (1803-1868)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-84-016-b_004.jpg', 'titel': 'Karl Jaegler, Lenzkirch (1803-1868)', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-86-002_003.jpg', 'titel': 'Porträt eines Herrn mit rötlichem Haar', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-80-025_003.jpg', 'titel': 'Bildnis einer jungen Frau mit weißer plissierter Haube', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_m-77-011_003.jpg', 'titel': 'Dr. Mackenzie of Edinburgh', 'anzeigeame': 'Henry Raeburn' },
{ 'dateiname': 'smf_aug_xxx_m-72-001-b_003.jpg', 'titel': 'Bildnis der Ehefrau', 'anzeigeame': 'Dionys Ganter' },
{ 'dateiname': 'smf_aug_xxx_m-90-010_003.jpg', 'titel': 'Frau mit Radhaube', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_2011-161_003.jpg', 'titel': 'Selbstporträt', 'anzeigeame': 'Ida Maier' },
{ 'dateiname': 'smf_aug_xxx_2013-335_003.jpg', 'titel': 'Italienisches Mädchen', 'anzeigeame': 'Hermann Winterhalter' },
{ 'dateiname': 'smf_aug_xxx_2015-231_003.jpg', 'titel': 'Bildnis von Lorenz Faller (1826 - 1880)', 'anzeigeame': 'Daniel Cornelius Gesell' },
{ 'dateiname': 'smf_aug_xxx_2015-299_003.jpg', 'titel': 'Bildnis von Edeltrud Steinle', 'anzeigeame': 'Unbekannt' },
{ 'dateiname': 'smf_aug_xxx_2016-091_003.jpg', 'titel': 'Bauernmädchen', 'anzeigeame': 'Benjamin Vautier' },
{ 'dateiname': 'smf_aug_xxx_2017-011_003.jpg', 'titel': 'Studie eines italienischen Mädchens', 'anzeigeame': 'Franz Xaver Winterhalter' },
{ 'dateiname': 'smf_aug_xxx_2019-100_002.jpg', 'titel': '"Der Trommler"', 'anzeigeame': 'Anton Küßwieder' }];

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

//array mit dateinamen
function downloadQuery() {
    fetch(`/downloadquery`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.result)
            return data.result
        }
        )
}
//array mit dateinamen
function getClustering(input) {
    fetch(`/getclustering/${input}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.result)
            return data.result
        }
        )
}


class Matcher extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isOpen: false,
            show: false,
            profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            images: null,
            imagePaths: []
        };
        this.getAllImagesInList();

    }

    /*state = {
        isOpen: false,
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    };*/

    handleClose = () => this.setState({ show: false });

    handleShow = () => this.setState({ show: true }, () => {
        //var filename = getStyleTransfer('input.png', 'style.png'); 
        //this.getAllImagesInList();
        //console.log(images);
        var filename = "input.png_styled.jpg"
        const reader = new FileReader();
        download(this, filename, reader)
    });

    openModal = () => this.setState({ isOpen: true }, () => { getStyleTransfer('input.png', 'style.png') });
    closeModal = () => this.setState({ isOpen: false });

    getAllImagesInList() {

        artistList.map((item, index) => { this.state.imagePaths.push('./croppedFotos/' + item.dateiname) });
        //backendList.map((item, index) => { this.state.imagePaths.push('./croppedFotos/' + item.dateiname) })
        console.log(this.state.imagePaths);

    }

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
                                {this.state.imagePaths.map((item, index) => (
                                    <Carousel.Item key={index + ""}>
                                        <img
                                            className="d-block w-100"
                                            src={item}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>{artistList[index].titel}</h3>
                                            <p>{artistList[index].anzeigeame}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>))}
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

                <Modal show={this.state.show} onHide={this.handleClose} animation={false} dialogClassName=".modal-90w" style={{ display: 'flex' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>It's a Match!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <img src={profileImg} alt="" id="img-paintings" className="img" style={{ width: 300, height: 300 }} />

                                </Col>
                                <Col md="auto">
                                    <img src={"/croppedFotos/smf_aug_xxx_2003-173_003.jpg"} alt="" id="img" className="img" style={{ width: 300, height: 300 }} />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Form.Label>Who Am I? An Introduction</Form.Label>
                                <p>
                                </p>
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