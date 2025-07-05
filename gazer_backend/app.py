from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Data storage (in a real app, you'd use a database)
PHRASES_FILE = 'phrases.json'

def load_phrases():
    """Load phrases from JSON file"""
    if os.path.exists(PHRASES_FILE):
        with open(PHRASES_FILE, 'r') as f:
            return json.load(f)
    return []

def save_phrases(phrases):
    """Save phrases to JSON file"""
    with open(PHRASES_FILE, 'w') as f:
        json.dump(phrases, f, indent=2)

@app.route('/api/phrases', methods=['GET'])
def get_phrases():
    """Get all phrases"""
    phrases = load_phrases()
    return jsonify(phrases)

@app.route('/api/phrases', methods=['POST'])
def add_phrase():
    """Add a new phrase"""
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400
    
    phrases = load_phrases()
    
    new_phrase = {
        'id': len(phrases) + 1,
        'text': data['text'],
        'created_at': datetime.now().isoformat(),
        'category': data.get('category', 'general')
    }
    
    phrases.append(new_phrase)
    save_phrases(phrases)
    
    return jsonify(new_phrase), 201

@app.route('/api/phrases/<int:phrase_id>', methods=['PUT'])
def update_phrase(phrase_id):
    """Update a phrase"""
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400
    
    phrases = load_phrases()
    
    for phrase in phrases:
        if phrase['id'] == phrase_id:
            phrase['text'] = data['text']
            phrase['category'] = data.get('category', phrase.get('category', 'general'))
            phrase['updated_at'] = datetime.now().isoformat()
            save_phrases(phrases)
            return jsonify(phrase)
    
    return jsonify({'error': 'Phrase not found'}), 404

@app.route('/api/phrases/<int:phrase_id>', methods=['DELETE'])
def delete_phrase(phrase_id):
    """Delete a phrase"""
    phrases = load_phrases()
    
    for i, phrase in enumerate(phrases):
        if phrase['id'] == phrase_id:
            deleted_phrase = phrases.pop(i)
            save_phrases(phrases)
            return jsonify({'message': 'Phrase deleted successfully', 'phrase': deleted_phrase})
    
    return jsonify({'error': 'Phrase not found'}), 404

@app.route('/api/phrases/batch', methods=['DELETE'])
def delete_multiple_phrases():
    """Delete multiple phrases"""
    data = request.get_json()
    
    if not data or 'ids' not in data:
        return jsonify({'error': 'IDs array is required'}), 400
    
    phrases = load_phrases()
    deleted_phrases = []
    
    # Remove phrases with matching IDs
    phrases = [phrase for phrase in phrases if phrase['id'] not in data['ids'] or deleted_phrases.append(phrase)]
    
    save_phrases(phrases)
    
    return jsonify({
        'message': f'Deleted {len(deleted_phrases)} phrases',
        'deleted_phrases': deleted_phrases
    })

@app.route('/api/speak', methods=['POST'])
def speak_phrase():
    """Endpoint for speech synthesis (frontend will handle actual speech)"""
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400
    
    # Log the speech request
    speech_log = {
        'text': data['text'],
        'timestamp': datetime.now().isoformat(),
        'user_agent': request.headers.get('User-Agent', 'Unknown')
    }
    
    return jsonify({
        'message': 'Speech request received',
        'text': data['text'],
        'timestamp': speech_log['timestamp']
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Gazer Backend API'
    })

if __name__ == '__main__':
    # Initialize with some default phrases if file doesn't exist
    if not os.path.exists(PHRASES_FILE):
        default_phrases = [
            {'id': 1, 'text': 'Hello', 'created_at': datetime.now().isoformat(), 'category': 'greeting'},
            {'id': 2, 'text': 'Thank you', 'created_at': datetime.now().isoformat(), 'category': 'gratitude'},
            {'id': 3, 'text': "What's your name?", 'created_at': datetime.now().isoformat(), 'category': 'question'},
            {'id': 4, 'text': 'OK', 'created_at': datetime.now().isoformat(), 'category': 'response'},
            {'id': 5, 'text': 'Yes', 'created_at': datetime.now().isoformat(), 'category': 'response'},
            {'id': 6, 'text': 'No', 'created_at': datetime.now().isoformat(), 'category': 'response'},
            {'id': 7, 'text': 'Can you repeat that?', 'created_at': datetime.now().isoformat(), 'category': 'question'},
            {'id': 8, 'text': 'Great!', 'created_at': datetime.now().isoformat(), 'category': 'response'}
        ]
        save_phrases(default_phrases)
    
    app.run(debug=True, host='0.0.0.0', port=9000) 