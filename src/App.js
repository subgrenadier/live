import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [showAd, setShowAd] = useState(true);

  // Handle closing the popup and opening the affiliate link
  const handleCloseAd = () => {
    window.open('https://shopee.com.my', '_blank');
    setShowAd(false);
  };

  useEffect(() => {
    // Display ad popup when user visits the site
    const timer = setTimeout(() => setShowAd(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <h1 className="text-center my-4">Live Stream</h1>

      {/* Video Player */}
      <div className="d-flex justify-content-center">
        <ReactPlayer
          url="https://berita-viral.com/live/stream/index.m3u8"
          playing
          controls
          width="80%"
          height="500px"
        />
      </div>

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
            Close Ad
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;