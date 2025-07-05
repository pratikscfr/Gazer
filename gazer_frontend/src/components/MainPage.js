import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';
import upArrow from '../assets/images/up-arrow.png';
import leftArrow from '../assets/images/left-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';

const API_BASE_URL = 'http://localhost:9000/api';

function MainPage() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrases, setCurrentPhrases] = useState({ left: [], right: [] });
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhrases();
  }, []);

  useEffect(() => {
    if (phrases.length > 0) {
      initializePhraseSelection();
    }
  }, [phrases]);

  const fetchPhrases = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/phrases`);
      setPhrases(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching phrases:', error);
      setLoading(false);
    }
  };

  const initializePhraseSelection = () => {
    setLow(0);
    setHigh(phrases.length);
    setMid(Math.floor(phrases.length / 2));
    updateCurrentPhrases(0, Math.floor(phrases.length / 2), phrases.length);
  };

  const updateCurrentPhrases = (lowIndex, midIndex, highIndex) => {
    const leftPhrases = phrases.slice(lowIndex, midIndex);
    const rightPhrases = phrases.slice(midIndex, highIndex);
    setCurrentPhrases({ left: leftPhrases, right: rightPhrases });
  };

  const handleKeyPress = (event) => {
    const key = event.keyCode;
    
    if (phrases.length === 0) return;
    
    if (low === mid - 1 && mid === high - 1) {
      // Final selection - only two phrases left
      if (key === 37 && phrases[low]) { // Left arrow
        speakPhrase(phrases[low]);
      } else if (key === 39 && phrases[mid]) { // Right arrow
        speakPhrase(phrases[mid]);
      } else if (key === 38) { // Up arrow - refresh
        initializePhraseSelection();
      }
      return;
    }

    if (key === 37) { // Left arrow
      const newHigh = mid;
      const newMid = low + Math.floor((newHigh - low) / 2);
      setHigh(newHigh);
      setMid(newMid);
      updateCurrentPhrases(low, newMid, newHigh);
    } else if (key === 39) { // Right arrow
      const newLow = mid;
      const newMid = newLow + Math.floor((high - newLow) / 2);
      setLow(newLow);
      setMid(newMid);
      updateCurrentPhrases(newLow, newMid, high);
    } else if (key === 38) { // Up arrow - refresh
      initializePhraseSelection();
    }
  };

  const speakPhrase = async (phrase) => {
    try {
      await axios.post(`${API_BASE_URL}/speak`, { text: phrase.text });
      
      // Use browser's speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(phrase.text);
        speechSynthesis.speak(utterance);
      }
      
      // Reset after speaking
      setTimeout(() => {
        initializePhraseSelection();
      }, 1000);
    } catch (error) {
      console.error('Error speaking phrase:', error);
    }
  };

  const handlePhraseClick = (phrase) => {
    speakPhrase(phrase);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [low, mid, high, phrases]);

  if (loading) {
    return <div className="loading">Loading phrases...</div>;
  }

  return (
    <div className="main">
      <div className="container brand">
        <h1>Gazer</h1>
        <h5>
          <Link to="/edit" className="edit-link">Edit phrases</Link>
        </h5>
      </div>

      <div className="container active-section">
        <div className="row">
          <div className="col-md-4 left" id="leftlist">
            {currentPhrases.left && currentPhrases.left.map((phrase, index) => (
              <h2 
                key={phrase.id} 
                className="phrase"
                onClick={() => handlePhraseClick(phrase)}
              >
                {phrase.text}
              </h2>
            ))}
          </div>

          <div className="col-md-4 snooze" id="snooze-section">
            <h1 className="snooze-text">Snooze</h1>
            <div className="row">
              <div className="arrows">
                <img src={upArrow} alt="up-arrow" className="arrow up-arrow" />
                <div>
                  <img src={leftArrow} alt="left-arrow" className="arrow left-arrow" />
                  <img src={rightArrow} alt="right-arrow" className="arrow right-arrow" />
                  <div style={{ clear: 'both' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 right" id="rightlist">
            {currentPhrases.right && currentPhrases.right.map((phrase, index) => (
              <h2 
                key={phrase.id} 
                className="phrase"
                onClick={() => handlePhraseClick(phrase)}
              >
                {phrase.text}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <div className="foot">
        <footer className="footer">
          <div className="row">
            <div className="col-md instructions">
              How does this work?
            </div>
            <div className="col-md names">
              <p>
                Pratik Chandra
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-square"></i></a>
              </p>
              <p>
                Bhagyaraj Pandab
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-square"></i></a>
              </p>
              <p>
                Aditya Kumar
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-square"></i></a>
              </p>
              <p>
                Raj Krishna
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-square"></i></a>
              </p>
              <p>
                Arka Bhattacharya
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-square"></i></a>
              </p>
            </div>
          </div>
        </footer>
        <div className="sellmovica">
          <p className="text-muted">2021 &copy;Gazer All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage; 