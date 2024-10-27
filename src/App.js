import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Modal, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
import ReactPlayer from 'react-player';

const App = () => {

  const [showAd, setShowAd] = useState(true);
  const [countdown, setCountdown] = useState('');
  const [adLink, setAdLink] = useState('');
  const [videoHeight, setVideoHeight] = useState('500px'); // Default height for video

  const adLinks = useMemo(() => [
    'https://s.shopee.com.my/4AiGggG2s8',
    'https://s.shopee.com.my/40OqUNGgD7',
    'https://s.shopee.com.my/4VL75IEmCE',
    'https://s.shopee.com.my/4L1gszFPXD',
    'https://s.shopee.com.my/3VSZtSIaE4'
  ], []);

  useEffect(() => {
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdLink(randomLink);
  }, [adLinks]); // Include adLinks in the dependency array


  // Countdown logic to match start time (6 PM Malaysia Time)
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(20, 15, 0, 0); // 6:00 PM today

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
        <title>Live Stream: Selangor vs JDT | Berita Viral</title>
        <meta name="description" content="Watch Selangor vs JDT live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: Selangor vs JDT" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://jdt-live.netlify.app/" />
        <meta property="og:image" content="https://www.imghost.net/ib/Bbxzm7VQZpr41NP_1730014602.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container fluid className="App my-4 dark-mode">
        <h2 className="text-center">Live Stream: Selangor vs JDT</h2>


        {/* Video Player */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <ReactPlayer
              url="https://berita-viral.com/live/stream.flv"
              controls
              width="100%"
              height={videoHeight} // Dynamic height
            />
          </Col>
        </Row>

        <Row className="text-start mb-4" style={{ margin: '0 10%' }}>

          {/* Add the Social Share Component */}
          <h4 className="text-center my-3">Share this match:</h4>
          <SocialShare title="Live Stream: Selangor vs JDT" url="https://jdt-live.netlify.app/" />

          {/* Match Details */}
          <Image
            src="https://www.imghost.net/ib/Bbxzm7VQZpr41NP_1730014602.jpg"
            alt="Match Preview"
            rounded
            className="my-3"
            fluid
            width="800vw"
          />


          <h5>Info Siaran Langsung & Live Streaming:</h5>
          <p>
            <strong>Tarikh:</strong> 27 Oktober 2024 (Ahad)<br />
            <strong>Masa:</strong> 8.15 pm<br />
            <strong>Venue:</strong> Stadium MBPJ, Kelana Jaya
          </p>

          {/* Match Countdown */}
          <h4 className="text-center my-3">⏳ Time left until match: {countdown}</h4>




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