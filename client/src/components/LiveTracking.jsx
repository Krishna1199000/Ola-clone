import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 1, 21));
    const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 1, 0));

    return (
        <div className="relative h-full">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={zoom}
                >
                    <Marker position={currentPosition} />
                </GoogleMap>
            </LoadScript>
            <div className="absolute bottom-10 left-10 flex gap-2 z-50">
                <button 
                    onClick={handleZoomIn} 
                    className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600"
                >
                    Zoom In
                </button>
                <button 
                    onClick={handleZoomOut} 
                    className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600"
                >
                    Zoom Out
                </button>
            </div>
        </div>
    );
};

export default LiveTracking;