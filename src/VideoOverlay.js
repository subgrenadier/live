import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import './ViewerOverlay.css'; // Custom styles

// Function to format large numbers into 'K' or 'M'
const formatViewCount = (count) => {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M';
    if (count >= 1_000) return (count / 1_000).toFixed(1) + 'K';
    return count;
};

const VideoWithOverlay = ({ viewers }) => { // Receive viewers as a prop
    const [streamUrl, setStreamUrl] = useState("https://streamer1.nexgen.bz/HBO2/index.m3u8");

    // Check stream availability and switch URL if available
    const checkStreamAvailability = async () => {
        try {
            const response = await fetch(
                "https://berita-viral.com/live/stream/index.m3u8",
                { method: 'HEAD' }
            );

            if (response.ok) {
                setStreamUrl("https://berita-viral.com/live/stream/index.m3u8");
            }
        } catch (error) {
            console.log("Stream not available yet:", error);
        }
    };

    // Poll stream availability every 30 seconds
    useEffect(() => {
        const interval = setInterval(checkStreamAvailability, 30000);
        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);
    return (
        <div className="player-wrapper">
            {/* React Player Component */}
            <ReactPlayer
                url={streamUrl}
                className="react-player"
                width="100%"
                height="100%"
                controls
            />

            {/* Viewer Overlay */}
            <div className="viewer-overlay">
                <FaEye className="eye-icon" />
                <span className="viewer-count">{formatViewCount(viewers)}</span> {/* Display viewer count */}
            </div>
        </div>
    );
};

export default VideoWithOverlay;
