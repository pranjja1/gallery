// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const res = await axios.get('http://localhost:5000/images');
            setImages(res.data);
        };
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        await axios.post('http://localhost:5000/upload', formData);
        setSelectedFile(null);
        // Fetch images again
        const res = await axios.get('http://localhost:5000/images');
        setImages(res.data);
    };

    return (
        <div>
            <h1>Image Gallery</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <div key={image._id} style={{ margin: '10px' }}>
                        <img src={`http://localhost:5000/${image.url}`} alt="Gallery" style={{ width: '200px', height: '200px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
