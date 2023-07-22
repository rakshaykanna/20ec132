/* NumberCruncher.css */
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const NumberCruncher = () => {
  const [inputURL, setInputURL] = useState('');
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const handleAddURL = () => {
    // Check if the inputURL is valid before adding it to the list of URLs
    if (inputURL.trim() !== '') {
      setUrls((prevUrls) => [...prevUrls, inputURL.trim()]);
      setInputURL('');
    }
  };

  const handleRemoveURL = (index) => {
    setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleFetchNumbers = async () => {
    try {
      const responses = await Promise.all(
        urls.map((url) => axios.get(url, { timeout: 500 }))
      );

      const mergedNumbers = responses.reduce((numbers, response) => {
        if (response.data && response.data.numbers) {
          numbers.push(...response.data.numbers);
        }
        return numbers;
      }, []);

      setNumbers(mergedNumbers);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <div className="url-input">
        <h2>Number Cruncher</h2>
        {urls.map((url, index) => (
          <div key={index}>
            <button className="url-button" onClick={() => handleRemoveURL(index)}>
              {url}
            </button>
          </div>
        ))}
        <div>
          <input
            type="text"
            value={inputURL}
            onChange={(e) => setInputURL(e.target.value)}
            placeholder="Enter URL"
          />
          <button onClick={handleAddURL} className="add-button">
            Add URL
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="fetch-button" onClick={handleFetchNumbers}>
          Fetch Numbers
        </button>
      </div>
      <div className="result">
        <h2>Result:</h2>
        <ul>
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NumberCruncher;