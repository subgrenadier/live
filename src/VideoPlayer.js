import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';
import './VideoPlayer.css'; // Assuming you have styles for the overlay

const socket = io('https://socket.berita-viral.com'); // Replace with your Socket.io server URL


const VideoPlayer = ({ height, url }) => { // Accept `height` and `url` as props
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
        // Listen for viewer count updates from the Socket.IO server
        socket.on('activeUsers', (count) => {
            setViewers(count);
        });

        // Clean up the connection on component unmount
        return () => {
            socket.off('activeUsers'); // Turn off the listener for `activeUsers`
            socket.disconnect();
        };
    }, []);

    // Format the viewer count
    const formatViewerCount = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k'; // e.g., 1200 becomes 1.2k
        }
        return count;
    };

    return (
        <div className="video-container">
            <ReactPlayer
                // url="https://berita-viral.com/live/stream/index.mpd"
                url={url}
                controls
                playing
                width="100%"
                height={height}
            />
            <div className="viewer-overlay">
                <i className="fas fa-user viewer-icon"></i>
                <span className="viewer-count">{formatViewerCount(viewers)}</span>
            </div>
        </div>
    );
};

export default VideoPlayer;
