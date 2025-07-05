import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditPage.css';
import upArrow from '../assets/images/up-arrow.png';
import leftArrow from '../assets/images/left-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';

const API_BASE_URL = 'http://localhost:9000/api';

function EditPage() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrases, setCurrentPhrases] = useState({ left: [], right: [] });
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPhrase, setNewPhrase] = useState('');
  const [selectedPhrases, setSelectedPhrases] = useState([]);

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

  const handleAddPhrase = async () => {
    if (!newPhrase.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/phrases`, {
        text: newPhrase.trim(),
        category: 'general'
      });
      
      setNewPhrase('');
      setShowModal(false);
      fetchPhrases(); // Refresh the phrases list
    } catch (error) {
      console.error('Error adding phrase:', error);
      alert('Failed to add phrase. Please try again.');
    }
  };

  const handleDeletePhrases = async () => {
    if (selectedPhrases.length === 0) return;

    try {
      await axios.delete(`${API_BASE_URL}/phrases/batch`, {
        data: { ids: selectedPhrases }
      });
      
      setSelectedPhrases([]);
      fetchPhrases(); // Refresh the phrases list
    } catch (error) {
      console.error('Error deleting phrases:', error);
      alert('Failed to delete phrases. Please try again.');
    }
  };

  const handlePhraseSelect = (phraseId) => {
    setSelectedPhrases(prev => {
      if (prev.includes(phraseId)) {
        return prev.filter(id => id !== phraseId);
      } else {
        return [...prev, phraseId];
      }
    });
  };

  const handleKeyPress = (event) => {
    const key = event.keyCode;
    
    if (phrases.length === 0) return;
    
    if (low === mid - 1 && mid === high - 1) {
      // Final selection - only two phrases left
      if (key === 37 && phrases[low]) { // Left arrow
        handlePhraseSelect(phrases[low].id);
      } else if (key === 39 && phrases[mid]) { // Right arrow
        handlePhraseSelect(phrases[mid].id);
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
        <h1>
          <Link to="/">Gazer</Link>
        </h1>
        <h5>
          <button 
            className="add-btn" 
            onClick={() => setShowModal(true)}
          >
            Add Phrase
          </button>
        </h5>
        <h5>
          <button 
            className="delete-btn" 
            onClick={handleDeletePhrases}
            disabled={selectedPhrases.length === 0}
          >
            Delete Phrase
          </button>
        </h5>
      </div>

      <div className="container active-section">
        <div className="row">
          <div className="col-md-4 left" id="leftlist">
            {currentPhrases.left && currentPhrases.left.map((phrase) => (
              <div key={phrase.id} className="phrase-container">
                <h2 className="phrase">
                  {phrase.text}
                </h2>
                <input
                  type="checkbox"
                  className="phrase-checkbox"
                  checked={selectedPhrases.includes(phrase.id)}
                  onChange={() => handlePhraseSelect(phrase.id)}
                />
              </div>
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
            {currentPhrases.right && currentPhrases.right.map((phrase) => (
              <div key={phrase.id} className="phrase-container">
                <h2 className="phrase">
                  {phrase.text}
                </h2>
                <input
                  type="checkbox"
                  className="phrase-checkbox"
                  checked={selectedPhrases.includes(phrase.id)}
                  onChange={() => handlePhraseSelect(phrase.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for adding new phrase */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5>Enter Text</h5>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                placeholder="Enter phrase text..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddPhrase();
                  }
                }}
              />
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddPhrase}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

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

export default EditPage; 