import React from 'react';
import './App.css'; // Optional for custom styles

const ResponsiveImage = () => {
    return (
        <div className="container text-center mt-2">
            <img
                src="https://i.ibb.co/kD2DfGw/SAabahvs-Kedah.jpg"
                alt="DescriptionSabah vs Kedah Live Stream"
                className="img-fluid"
                style={{ maxWidth: '600px', width: '100%' }}
            />
        </div>
    );
};

export default ResponsiveImage;