import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Modal, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your CSS file

const App = () => {
  const [showAd, setShowAd] = useState(true);

  const handleCloseAd = () => {
    window.open('https://s.shopee.com.my/qRfu8QHcS', '_blank');
    setShowAd(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container fluid className="App my-4 dark-mode">
      <h2 className="text-center">Live Stream: Gwangju vs JDT</h2>


      {/* Video Player */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <ReactPlayer
            url="https://berita-viral.com/live/stream/index.m3u8"
            playing
            controls
            width="100%"
            height="500px"
          />
        </Col>
      </Row>

      <h5>Info Siaran Langsung & Live Streaming:</h5>
      <p>
        <strong>Tarikh:</strong> 22 Oktober 2024 (Selasa)<br />
        <strong>Masa:</strong> 6 petang<br />
        <strong>Venue:</strong> Yongin Citizen Sports Park
      </p>

      {/* Match Details */}
      <Image
        src="https://i.ytimg.com/vi/MCLBw4PsOHU/hq720.jpg"
        alt="Match Preview"
        rounded
        className="my-3"
        fluid
      />
      <Row className="text-start mb-4">
        <Col>
          <p>
            Juara bertahan Liga Super Malaysia, Johor Darul Ta'zim akan meneruskan perjuangan dalam saingan Liga Juara-Juara Asia Elit (ACLE) menentang pendahulu kumpulan dari Korea Selatan, Gwangju FC petang esok.
          </p>
          <p>
            JDT yang kini berada di tangga kedua kumpulan A bagi saingan tersebut mengumpul 4 mata manakala Gwangju gah mendahului kumpulan dengan 6 mata melalui 2 kemenangan terdahulu.
          </p>
          <p>
            Pertemuan ini pastinya menjadi tumpuan bagi zon Asia Timur dengan kedua-dua pasukan menginginkan tempat teratas kumpulan selepas mengharungi perlawanan ketiga kumpulan.
          </p>
        </Col>
      </Row>

      {/* Ad Popup */}
      <Modal show={showAd} onHide={handleCloseAd} centered>
        <Modal.Header closeButton>
          <Modal.Title>Special Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Check out this amazing deal! Click below to explore.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseAd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;