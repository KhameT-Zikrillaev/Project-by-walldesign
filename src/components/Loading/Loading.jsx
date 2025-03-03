import React from 'react';
import './Loading.css'; // Импортируем стили

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-container">
                <div className="loading-stripes">
                    <div className="stripe"></div>
                    <div className="stripe"></div>
                    <div className="stripe"></div>
                    <div className="stripe"></div>
                </div>
                <div className="loading-text">Загрузка...</div>
            </div>
        </div>
    );
};

export default Loading;