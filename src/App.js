import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
// import VideoPlayer from './VideoPlayer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [showAd, setShowAd] = useState(true);
  const [adLink, setAdLink] = useState('');
  const [videoHeight, setVideoHeight] = useState('500px'); // Default height for video

  const adLinks = useMemo(() => [
    'https://s.shopee.com.my/2qDy0Lwm5A',
    'https://s.shopee.com.my/2fuXo2xPQ9',
    'https://s.shopee.com.my/3AqoOxvVPG',
    'https://s.shopee.com.my/30XOCew8kF'
  ], []);

  //   https://s.shopee.com.my/BDCpUofKV
  // https://s.shopee.com.my/10mJp1lUdg
  // https://s.shopee.com.my/1B5k1KkrIj
  // https://s.shopee.com.my/g9TQPmlJe

  //   https://shopee.com.my/product/13367397/25350351295
  // https://shopee.com.my/product/385280897/26017419736
  // https://shopee.com.my/product/19049195/24072867933
  // https://shopee.com.my/product/96670954/24255019528

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
        <title>Live Stream: Cambodia vs Malaysia | Berita Viral</title>
        <meta name="description" content="Watch Cambodia vs Malaysia football live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: Cambodia vs Malaysia" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://bolalive.netlify.app/" />
        <meta property="og:image" content="https://i.ytimg.com/vi/UqxisyA77wc/hq720.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container fluid className="dark-mode">
        <h2 className="text-center py-4">Cambodia vs Malaysia</h2>


        {/* Video Player */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={5}>
            <div className="ratio ratio-4x3">
              <iframe
                src="https://berita-viral.com/embed/video"
                title="Cambodia vs Malaysia"
                referrerpolicy="origin"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>

        {/* <VideoPlayer height={videoHeight} url="https://berita-viral.com/hls/stream.m3u8" /> */}


        <Row className="text-start mb-4" style={{ margin: '0 10%' }}>
          {/* Social Share Component */}
          <Col xs={12} md={6} className="text-center">
            <h4 className="text-center my-3">Share this match:</h4>
            <SocialShare title="Live Stream: Cambodia vs Malaysia" url="https://bolalive.netlify.app/" />
          </Col>

          {/* Info Section */}
          <Col xs={12} md={6}>
            <div className="info-container" style={{ marginTop: '3em' }}>
              <h5>Info Siaran Langsung & Live Streaming:</h5>
              <p>
                <strong>Tarikh:</strong> 8 Disember 2024 (Ahad)<br />
                <strong>Masa:</strong> 6.45 pm<br />
                <strong>Venue:</strong> Phnom Penh Olympic Stadium
              </p>
            </div>
          </Col>
        </Row>


        {/* Ad Popup */}
        <Modal show={showAd} onHide={handleCloseAd} centered dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopee 12.12 Birthday Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Shopee Live 90% OFF. Lowest Price Guaranteed. Free Shipping. No Min Spend. Check out this amazing deal! Click below to explore.</p>
            <Image src={`${process.env.PUBLIC_URL}/shopee1212.jpeg`} fluid onClick={handleCloseAd} alt="Shopee Ad"
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