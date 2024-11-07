import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
import VideoPlayer from './VideoPlayer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [showAd, setShowAd] = useState(true);
  const [adLink, setAdLink] = useState('');
  const [videoHeight, setVideoHeight] = useState('500px'); // Default height for video

  const adLinks = useMemo(() => [
    'https://s.shopee.com.my/7fIQKBBX4q',
    'https://s.shopee.com.my/3fmHYlsho0',
    'https://s.shopee.com.my/3q5hlBkqN5',
    'https://s.shopee.com.my/5pqm8vbXsB'
  ], []);

  useEffect(() => {
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdLink(randomLink);
  }, [adLinks]); // Include adLinks in the dependency array


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
        <title>Live Stream: Jeonbuk FC vs Selangor FC | Berita Viral</title>
        <meta name="description" content="Watch Jeonbuk FC vs Selangor FC live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: Jeonbuk FC vs Selangor FC" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://selangorlive.netlify.app/" />
        <meta property="og:image" content="https://i.ytimg.com/vi/KqTJM_abAiY/maxresdefault.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container fluid className="dark-mode">
        <h2 className="text-center">Live Stream: Jeonbuk FC vs Selangor FC</h2>


        {/* Video Player */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <VideoPlayer height={videoHeight} url="https://berita-viral.com/live/selangor/index.m3u8" />
          </Col>
        </Row>

        <Row className="text-start mb-4" style={{ margin: '0 10%' }}>

          {/* Add the Social Share Component */}
          <h4 className="text-center my-3">Share this match:</h4>
          <SocialShare title="Live Stream: Jeonbuk FC vs Selangor FC" url="https://selangorlive.netlify.app/" />

          <div className="info-container" style={{ marginTop: '10em' }}>
            <h5>Info Siaran Langsung & Live Streaming:</h5>
            <p>
              <strong>Tarikh:</strong> 7 November 2024 (Khamis)<br />
              <strong>Masa:</strong> 6.00 pm<br />
              <strong>Venue:</strong>Jeonju World Cup Stadium
            </p>
          </div>

        </Row>

        {/* Ad Popup */}
        <Modal show={showAd} onHide={handleCloseAd} centered dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopee 11.11 Big Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>90% OFF. Lowest Price Guaranteed. Free Shipping. No Min Spend. Check out this amazing deal! Click below to explore.</p>
            <Image src={`${process.env.PUBLIC_URL}/shopee1111.jpg`} fluid onClick={handleCloseAd} alt="Shopee Ad"
              style={{ width: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>
    </>
  );
};

export default App;