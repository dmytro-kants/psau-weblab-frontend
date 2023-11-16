import React from 'react';
import '../../assets/styles/error.css';

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-message">Упс! Сторінки не існує.</p>
    </div>
  );
};

export default Error;