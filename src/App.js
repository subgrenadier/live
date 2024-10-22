import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Modal, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';

const App = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [showAd, setShowAd] = useState(true);
  const [countdown, setCountdown] = useState('');
  const [adLink, setAdLink] = useState('');
  const [videoHeight, setVideoHeight] = useState('500px'); // Default height for video

  // List of ad links to randomize
  const adLinks = [
    'https://s.shopee.com.my/702Jn2koKU',
    'https://s.shopee.com.my/7ALjzLkAzX',
    'https://s.shopee.com.my/8fAXm6eSwq',
    'https://s.shopee.com.my/8pTxyPdpbt',
    'https://s.shopee.com.my/6ATCnj4f5Q',
    'https://s.shopee.com.my/609mbQ5IQP',
    'https://s.shopee.com.my/6V63CL3OPW'
  ];

  // Randomize ad link on component mount
  useEffect(() => {
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdLink(randomLink);
  }, []);

  // Countdown logic to match start time (6 PM Malaysia Time)
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(18, 0, 0, 0); // 6:00 PM today

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdown('The match has started!');
        clearInterval(interval);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch visitor count using CountAPI
  const updateVisitorCount = async () => {
    try {
      const response = await fetch('https://api.countapi.xyz/hit/berita-viral.com/visits');
      const data = await response.json();
      setVisitorCount(data.value);
    } catch (error) {
      console.error('Failed to update visitor count:', error);
    }
  };

  useEffect(() => {
    updateVisitorCount();
  }, []);

  const handleCloseAd = () => {
    window.open(adLink, '_blank'); // Open random ad link
    setShowAd(false);
  };

  // Adjust video height based on screen orientation and size
  const updateVideoHeight = () => {
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode: Height is adjusted to fit the width based on aspect ratio
      setVideoHeight(`${window.innerWidth * aspectRatio}px`);
    } else {
      // Landscape mode: Default height
      setVideoHeight('500px');
    }
  };

  useEffect(() => {
    updateVideoHeight(); // Set the height initially
    window.addEventListener('resize', updateVideoHeight); // Listen for window resize events

    return () => window.removeEventListener('resize', updateVideoHeight); // Cleanup event listener
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Live Stream: Gwangju vs JDT | Berita Viral</title>
        <meta name="description" content="Watch Gwangju vs JDT live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: Gwangju vs JDT" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://jdt-live.netlify.app/" />
        <meta property="og:image" content="https://i.ytimg.com/vi/MCLBw4PsOHU/hq720.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

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
              height={videoHeight} // Dynamic height
            />
          </Col>
        </Row>
        <Row className="text-start mb-4" style={{ margin: '0 10%' }}>
          <h5>Info Siaran Langsung & Live Streaming:</h5>
          <p>
            <strong>Tarikh:</strong> 22 Oktober 2024 (Selasa)<br />
            <strong>Masa:</strong> 6 petang<br />
            <strong>Venue:</strong> Yongin Citizen Sports Park
          </p>

          {/* Match Countdown */}
          <h4 className="text-center my-3">⏳ Time left until match: {countdown}</h4>

          {/* Match Details */}
          <Image
            src="https://i.ytimg.com/vi/MCLBw4PsOHU/hq720.jpg"
            alt="Match Preview"
            rounded
            className="my-3"
            fluid
            width="50vw"
          />

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
        <Modal show={showAd} onHide={handleCloseAd} centered dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopee Oct 25 Payday Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>70% OFF. Free Shipping. No Min Spend. Check out this amazing deal! Click below to explore.</p>
            <Image src={`${process.env.PUBLIC_URL}/shopee_rectangle.png`} fluid onClick={handleCloseAd} alt="Shopee Ad"
              style={{ width: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Visitor Counter & Popularity Nudge */}
        <h4 className="text-center my-3 py-2">👀 {visitorCount} people are watching now!</h4>
      </Container>
    </>
  );
};

export default App;