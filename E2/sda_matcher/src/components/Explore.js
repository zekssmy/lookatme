import { React, Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactPlayer from 'react-player'

export default class Explore extends Component {

    artistList = [{ 'dateiname': 'smf_aug_xxx_01573_003.jpg', 'titel': 'Weibliches Bildnis', 'anzeigeame': 'R. Max Seemann' },
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


    render() {
        return (

            <Container fluid>
                <Row>
                    Card      <Col style={{ paddingLeft: 0 }}>

                        <Accordion defaultActiveKey="0" flush={true} className="w-100">
                            {this.artistList.map((item, index) => (
                                <Accordion.Item eventKey={index + ""} key={index + ""}>
                                    <Accordion.Header>{item.titel}</Accordion.Header>
                                    <Accordion.Body>
                                        {item.anzeigeame}
                                    </Accordion.Body>
                                </Accordion.Item>))}
                        </Accordion>

                    </Col>
                    <Col xs={6}>2 of 3 (wider)
                        <Container style={{ width: 300, height: 300 }}>
                            {/*<ReactPlayer
                                className='react-player fixed-bottom'
                                url='videos/result_voice(2).mp4'
                                width='300'
                                height='300'
                                controls={true}
                            />*/}
                        </Container>
                    </Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        )
    }
}